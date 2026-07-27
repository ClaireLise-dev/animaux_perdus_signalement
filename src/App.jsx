import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { lazy, Suspense } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/query";
import Layout from "./layouts/Layout";

const Home = lazy(() => import("./pages/Home"));
const Signaler = lazy(() => import("./pages/Signaler"));
const AnimalProfil = lazy(() => import("./pages/AnimalProfil"));
const ANourrir = lazy(() => import("./pages/ANourrir"));
const Error = lazy(() => import("./pages/Error"));

// Pas d'AuthContext ni de routes protégées : tout est public, comme prévu
// dans le plan (zéro friction pour les propriétaires et les assos/mairie).
export default function App() {
  return (
    <>
      <ToastContainer theme="dark" position="bottom-right" />
      <QueryClientProvider client={queryClient}>
        <RouterProvider
          router={createBrowserRouter([
            {
              path: "/",
              element: (
                <Suspense>
                  <Layout />
                </Suspense>
              ),
              errorElement: (
                <Suspense>
                  <Error />
                </Suspense>
              ),
              children: [
                {
                  path: "/",
                  element: (
                    <Suspense>
                      <Home />
                    </Suspense>
                  ),
                  index: true,
                },
                {
                  path: "signaler",
                  element: (
                    <Suspense>
                      <Signaler />
                    </Suspense>
                  ),
                },
                {
                  path: "animal/:id",
                  element: (
                    <Suspense>
                      <AnimalProfil />
                    </Suspense>
                  ),
                },
                {
                  path: "a-nourrir",
                  element: (
                    <Suspense>
                      <ANourrir />
                    </Suspense>
                  ),
                },
                {
                  path: "/404",
                  element: (
                    <Suspense>
                      <Error />
                    </Suspense>
                  ),
                },
              ],
            },
          ])}
        />
      </QueryClientProvider>
    </>
  );
}
