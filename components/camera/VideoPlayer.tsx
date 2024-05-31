import { useEffect, useRef, useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import {
  MediaStream,
  RTCIceCandidate,
  RTCPeerConnection,
  RTCView,
} from 'react-native-webrtc';

interface CameraStreamPlayerProps {
  cameraName: string;
}

export default function CameraStreamPlayer({ cameraName }: CameraStreamPlayerProps) {
  const peerConnection = new RTCPeerConnection({
    iceServers: [
      {
        urls: 'stun:stun.l.google.com:19302'
      }
    ],
  });

  let remoteMediaStream = new MediaStream();
  let remoteCandidates: RTCIceCandidate[] = [];

  const [streamUrl, setStreamUrl] = useState<string>(remoteMediaStream.toURL());

  peerConnection.addEventListener('track', event => {
    // Grab the remote track from the connected participant.
    remoteMediaStream.addTrack(event.track!);
  });

  peerConnection.addEventListener('iceconnectionstatechange', event => {
    switch (peerConnection.iceConnectionState) {
      case 'connected':
      case 'completed':
        // You can handle the call being connected here.
        // Like setting the video streams to visible.
        setStreamUrl(remoteMediaStream.toURL());
        break;
    };
  });

  peerConnection.addEventListener('icecandidate', event => {
    // When you find a null candidate then there are no more candidates.
    // Gathering of candidates has finished.
    if (!event.candidate) { return; };

    // Send the event.candidate onto the person you're calling.
    // Keeping to Trickle ICE Standards, you should send the candidates immediately.

    webSocket.current?.send(JSON.stringify({
      type: 'webrtc/candidate',
      value: event.candidate.candidate
    }));
  });

  async function processCandidates() {
    if (remoteCandidates.length < 1) { return; };

    remoteCandidates.map(candidate => peerConnection.addIceCandidate(candidate))
    remoteCandidates = [];
  };

  const webSocket = useRef<WebSocket | null>(null);

  async function createConnection() {

    webSocket.current = new WebSocket(`ws://172.20.10.5:1984/api/ws?src=${cameraName}`);

    webSocket.current.addEventListener('open', async () => {
      console.log('Connected to WebSocket');

      const offer = await peerConnection.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true
      });

      await peerConnection.setLocalDescription(offer);

      webSocket.current?.send(JSON.stringify({
        type: 'webrtc/offer',
        value: offer.sdp
      }));

      webSocket.current?.addEventListener('message', async (event) => {
        const data = JSON.parse(event.data);

        if (data.type === 'webrtc/answer') {
          await peerConnection.setRemoteDescription({
            type: 'answer',
            sdp: data.value
          });

          await processCandidates();
        }

        if (data.type === 'webrtc/candidate') {
          const iceCandidate = new RTCIceCandidate({
            candidate: data.value,
            sdpMLineIndex: 1,
            sdpMid: 'video'
          });

          if (peerConnection.remoteDescription == null) {
            return remoteCandidates.push(iceCandidate);
          };

          return peerConnection.addIceCandidate(iceCandidate);
        }
      });

    });;

    webSocket.current.addEventListener('close', (event) => {
      console.log('Disconnected from WebSocket');
    });

    webSocket.current.addEventListener('error', (event) => {
      console.error('WebSocket error:', event);
    });
  }


  useEffect(() => {
    return () => {
      webSocket.current?.close();
      peerConnection.close();
    }
  }, []);


  return (
    <View>
      <RTCView
        objectFit={'cover'}
        streamURL={streamUrl}
        style={styles.video}
      />

      <Button title="Create connection" onPress={createConnection} />
    </View>
  )
}

const styles = StyleSheet.create({
  video: {
    aspectRatio: 16 / 9,
    width: '100%',
  }
})