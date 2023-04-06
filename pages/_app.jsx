import Layout from "@/layout/Layout";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from 'react-toastify';
import Router from "next/router";
import nProgress from "nprogress";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-toastify/dist/ReactToastify.css';
import "nprogress/nprogress.css";
import '@/styles/globals.css'

import io from 'socket.io-client';
import { useEffect } from "react";

Router.events.on("routeChangeStart", () => nProgress.start());
Router.events.on("routeChangeComplete", () => nProgress.done());
Router.events.on("routeChangeError", () => nProgress.done());

const socket = io('http://localhost:3000', {
  transports: ['websocket'],
})

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const socketInitializer = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/socket`)
  }

  useEffect(() => {
    socketInitializer()
  }, [])

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Layout>
          <div className="pt-[88px]">
            <ToastContainer />
            <Component
              {...pageProps}
              socket={socket}
            />
          </div>
        </Layout>
      </Provider>
    </SessionProvider>
  )
}