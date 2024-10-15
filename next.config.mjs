/** @type {import('next').NextConfig} */
import NextFederationPlugin from "@module-federation/nextjs-mf";

const nextConfig = {
  reactStrictMode: true,

  webpack(config, options) {
    const { isServer } = options;
    const location = isServer ? "ssr" : "chunks";
    config.plugins.push(
      new NextFederationPlugin({
        name: "remoteApp",
        filename: "static/chunks/remoteEntry.js",
        remotes: {
          hostApp: `hostApp@http://localhost:5001/_next/static/${location}/remoteEntry.js`,
        },
        exposes: {
          // "./Navbar": "./components/Navbar",
          // "./Footer": "./components/Footer",
          "./axiosInstance": "./utlis/axiosInstance",
          "./asyncStorage": "./utlis/asyncStorage",
        },
        extraOptions: {
          debug: false, // `false` by default
          exposePages: false, // `false` by default
        },
        initOptions: {
          shareStrategy: "loaded-first", // Use initOptions.shareStrategy
        },
        shared: {
          primereact: {
            singleton: true,
            eager: true, // Load upfront if used frequently
            requiredVersion: false, // Allow any compatible version
            // strategy: "  ",
          },
        },
      })
    );
    config.module.rules.push({
      test: /\.css$/,
      use: ["style-loader", "css-loader"],
    });

    return config;
  },
};

export default nextConfig;
