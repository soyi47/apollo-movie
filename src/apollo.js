import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient ({
    uri: "http://localhost:4000/",
    cache: new InMemoryCache(),
    resolvers: {
        Movie: {
            isLiked: () => false
        },
        Mutation: {
            toggleLikeMovie: (_, { id, isLiked }, { cache }) => {
                cache.modify({  // cache.writeData 대신 modify 사용
                    id: `Movie:${id}`,
                    fields: {
                        isLiked: () => !isLiked,
                    }
                })
            }
        }
    }
});

export default client;

/* 
    uri를 url로 적어서 난리...

    isLiked는 벡엔드가 아닌 프론트엔드에서 넘어오는 데이터

    Local State cache 수정하기
        "client|cache.writeData have been fully removed. 
        client|cache.writeQuery, client|cache.writeFragment, and/or cache.modify can be used to update the cache."
        => cache.wrteData 대신 cache.modify 사용!
        - https://www.apollographql.com/docs/react/migrating/apollo-client-3-migration/#breaking-cache-changes
        - https://www.apollographql.com/docs/react/caching/cache-interaction/#cachemodify
*/