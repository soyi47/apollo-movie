import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient ({
    uri: "http://localhost:4000/",
    cache: new InMemoryCache()
});

export default client;

/* 
    uri를 url로 적어서 난리...
*/