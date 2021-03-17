import React from "react";
import { useParams } from "react-router-dom"
import { gql, useQuery } from "@apollo/client"
import styled from "styled-components";

const GET_MOVIE = gql`
    query getMovie($id: String!) {  
        movie(id : $id) {
            title
            medium_cover_image
            language
            rating
            description_intro
        }
    }
`

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
`;

const Poster = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center center;
`;

function Detail() {
    const { id } = useParams(); // useParams()에서 id 값을 String type으로 받아옴
    const { loading, data } = useQuery(GET_MOVIE, {
        variables: {id : id}
    });
    return (
        <Container>
            <Column>
                <Title>
                    {loading
                    ? "Loading..."
                    : `${data.movie.title}`}
                </Title>
                <Subtitle>
                    {data?.movie?.language} · {data?.movie?.rating}
                </Subtitle>
                <Description>{data?.movie?.description_intro}</Description>
            </Column>
            <Poster bg={data?.movie?.medium_cover_image}></Poster>
        </Container>
    );
}

export default Detail;


/*
    gql의 첫줄
        query getMovie($id: Int) ...
    부분은 Apollo를 위한 부분으로, Apollo가 변수의 type을 검사하도록 해줌. 
    이후 query는 서버를 위한 부분으로, 실제 query에 Apollo가 검사한 변수를 주고 그 query를 서버로 보냄

    useQuery()
        첫번째 인자에는 query, 그리고 옵션으로 query 실행에 필요한 변수들을 담은 객체를 줄 수 있음.
        이때 변수의 key-value 의 값이 {id : id}와 같이 서로 같으면 { id } 로 축약 가능 
        https://www.apollographql.com/docs/react/api/react/hooks/#usequery

    서버에서 
        TypeError: Int cannot represent non-integer value: 
    위와 같은 에러 띄우며 계속 Movie detail 정보를 못 받아옴.
    query에 들어온 value를 int로 받도록 해놨는데, int가 아닌 값이 들어온다는 거...?
    useParams() 확인해보니 ID 값을 String으로 받아와서 String으로 넘겨서 쿼리 실행 안 됨.
    -> movie 쿼리에서 받는 id를 String 타입으로 변경함

*/