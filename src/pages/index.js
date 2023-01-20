import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';
import * as React from 'react'
import client from '../apollo/client';

const QUERY = client
  .query({
    query: gql`
    {
      character(id: 1) {
        name
        image
      }
    }
    `,
  }).then((result) => console.log(result));


const Rick = gql`
query
  {
      character(id: 1) {
        name
        image
      }
  }
`;
function Cupcake() {
  const { loading, error, data } = useQuery(Rick);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

return(
    <ApolloProvider client={client}><p>Hola</p></ApolloProvider>
  )
}

export default Cupcake;