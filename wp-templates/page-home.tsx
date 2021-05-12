import React from 'react';
import { useGeneralSettings } from '@wpengine/headless/react';
import { usePost, getNextStaticProps } from '@wpengine/headless/next';
import { Header, Hero, Footer } from '../components';
import { gql, useQuery } from '@apollo/client';
import { getApolloClient } from '@wpengine/headless';
import { GetStaticPropsContext } from 'next';

const queryDevelopers = gql`
    {
      page(id: "cG9zdDoyNQ==") {
        developers {
          job
          message
          name
        }
      }
    }
  `;

export default function Page(): JSX.Element {
  const post = usePost();
  const settings = useGeneralSettings();

  const { data } = useQuery(queryDevelopers);
  const developers = data?.page?.developers ?? [];
  
  return (
    <>
      <Header title={settings?.title} description={settings?.description} />
      <main className="content content-page">
        {post?.title && <Hero title={post?.title} />}
        <div className="wrap">
          {post && (
            <div>
              <div>
                {/* eslint-disable-next-line react/no-danger */}
                <div dangerouslySetInnerHTML={{ __html: post.content ?? '' }} />
              </div>
            </div>
          )}
        </div>

        <h3>{developers.name}</h3>
        <h4>{developers.job}</h4>
        <p>{developers.message}</p>

      </main>

      <Footer copyrightHolder={settings?.title} />
    </>
  );
};

interface StaticPropsResult {
  revalidate?: number | boolean;
}

export async function getStaticProps(context: GetStaticPropsContext){
  const client = getApolloClient(context);
  await client.query({
    query: queryDevelopers,
  });

  const props = (await getNextStaticProps(context)) as StaticPropsResult;

  props.revalidate = 1;

  return props;
}
