'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const PlayerComp = dynamic(
  () => import('@lottiefiles/react-lottie-player').then((mod) => mod.Player),
  { ssr: false }
);

export default function LottiePlayer(props) {
  return <PlayerComp {...props} />;
}
