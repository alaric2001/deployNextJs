/**
 * @author PT. ESD - Telkom University
 * @copyright © All rights reserved. Dashboard 2023
 */

import Image from 'next/image';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
import DashboardLogo from '~/images/Dashboard-logo.png';

export default function HomePage() {
  return (
    <Layout>
      <Seo />

      <main>
        <div className='w-100 flex h-screen items-center justify-center bg-white'>
          <Image
            src={DashboardLogo.src}
            className='scale-75'
            alt='Dashboard-logo'
            width={DashboardLogo.width}
            height={DashboardLogo.height}
          />
        </div>
      </main>
    </Layout>
  );
}
