import Head from 'next/head';

type HeadProps = {
  title?: string;
};

export default function HeadTag({ title }: HeadProps) {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
    </div>
  );
}
