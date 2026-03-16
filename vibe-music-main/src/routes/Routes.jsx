import { createBrowserRouter } from "react-router-dom";
import React from "react";
import Layout from "../components/NavbarBlock/Layout";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import ProfileContainer from "../components/UserProfiles/ProfileContainer";
import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoutes from "./PublicRoutes";
import ResetPassword from "../components/auth/ResetPassword";
import MyAccount from "../components/UserProfiles/MyAccount";
import ChangePassword from "../components/UserProfiles/ChangePassword";
import AddProfile from "../components/UserProfiles/AddProfile";
import Settings from "../components/UserProfiles/Settings";
import UploadProfilePhoto from "../components/UserProfiles/UploadProfilePhoto";
import PhoneAuth from "../components/auth/PhoneAuth";
import AdminRoute from "./AdminRoute";
import AdminContainer from "../components/admin/AdminContainer";
import AdminDashboard from "../components/admin/AdminDashboard";
import CreateAlbum from "../components/admin/album/CreateAlbum";
import AlbumLandingContainer from "../components/AlbumLandingPage/AlbumLandingContainer";
import AlbumLandingContent from "../components/AlbumLandingPage/AlbumLandingContent";
import AlbumDetails from "../components/AlbumLandingPage/AlbumDetails";
import ArtistSongs from "../components/AlbumLandingPage/ArtistSongs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <AlbumLandingContainer />, //Sidebar and Outlet
        children: [
          {
            index: true,
            element: <AlbumLandingContent />,
          },
          {
            path: "album-details/:id/:title",
            element: <AlbumDetails />,
          },
          {
            path: "artist/:artistName",
            element: <ArtistSongs />,
          },
        ],
      },
      {
        path: "/auth/login",
        element: (
          <PublicRoutes>
            <Login />
          </PublicRoutes>
        ),
      },
      {
        path: "/auth/register",
        element: (
          <PublicRoutes>
            <Register />
          </PublicRoutes>
        ),
      },
      {
        path: "/auth/resetpassword",
        element: (
          <PublicRoutes>
            <ResetPassword />
          </PublicRoutes>
        ),
      },
      {
        path: "/auth/phone-auth",
        element: (
          <PublicRoutes>
            <PhoneAuth />
          </PublicRoutes>
        ),
      },
      {
        path: "/admin",
        element: (
          <ProtectedRoutes>
            <AdminRoute>
              <AdminContainer />
            </AdminRoute>
          </ProtectedRoutes>
        ),
        children: [
          {
            index: true,
            element: <AdminDashboard />,
          },
          {
            path: "create-album",
            element: <CreateAlbum />,
          },
        ],
      },
      {
        path: "/user/profile",
        element: (
          <ProtectedRoutes>
            <ProfileContainer />
          </ProtectedRoutes>
        ),
        children: [
          {
            path: "my-account",
            element: (
              <ProtectedRoutes>
                <MyAccount />
              </ProtectedRoutes>
            ),
          },
          {
            path: "change-password",
            element: (
              <ProtectedRoutes>
                <ChangePassword />
              </ProtectedRoutes>
            ),
          },
          {
            path: "upload-photo",
            element: (
              <ProtectedRoutes>
                <UploadProfilePhoto />
              </ProtectedRoutes>
            ),
          },
          {
            path: "add-profile",
            element: (
              <ProtectedRoutes>
                <AddProfile />
              </ProtectedRoutes>
            ),
          },
          {
            path: "change-password",
            element: (
              <ProtectedRoutes>
                <ChangePassword />
              </ProtectedRoutes>
            ),
          },
          {
            path: "settings",
            element: (
              <ProtectedRoutes>
                <Settings />
              </ProtectedRoutes>
            ),
          },
        ],
      },
      {
        path: "*",
        element: <h1>Page Not Found</h1>,
      },
    ],
  },
]);

export default router;
