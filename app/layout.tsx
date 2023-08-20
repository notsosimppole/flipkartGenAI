import "./globals.scss";

import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { SignIn } from "./components";

import {
  ModeProvider,
  SessionProvider,
  Sidebar,
  SlideOver,
} from "./components";

export const metadata = {
  title: "ChicChat AI",
  description: "Generative AI Language Model",
  icons: {
    icon: "/logo.png",
  },
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  return (
    <html lang='en'>
      <body>
        <ModeProvider>
          <SessionProvider session={session}>
            {session ? (
              <div className='flex'>
                <Sidebar />
                <SlideOver />

                {/* <ClientProvider /> */}

                <div className='bg-white dark:bg-[#001C30] flex-1'>
                  {children}
                </div>
              </div>
            ) : (
              <SignIn />
            )}
          </SessionProvider>
        </ModeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
