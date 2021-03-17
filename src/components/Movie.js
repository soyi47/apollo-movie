import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { gql, useMutation } from "@apollo/client";

const LIKE_MOVIE = gql`
    mutation toggleLikeMovie($id: String!, $isLiked: Boolean!) {
        toggleLikeMovie(id: $id, isLiked: $isLiked) @client
    }
`

const Container = styled.div`
    height: 420px;
    width: 100%;
`;

const Poster = styled.div`
  background-image: url(${props => props.bg});
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center center;
  border-radius: 7px;
`;

function Movie({ id, bg, isLiked }) {
    const [toggleMovie] = useMutation(LIKE_MOVIE, { 
        variables : { id: id, isLiked } 
    });
    return (
        <Container>
            <Link to={`/${id}`}>
                <Poster bg={bg} />
            </Link>
            <button onClick={toggleMovie}>{ isLiked ? "Unlike" : "Like" }</button>
        </Container>
    );
}

export default Movie;

/* 
    영화 디테일 페이지로 한번 들어갔다가 나와야 캐시가 저장되는 듯?
    처음 홈에서 Like 누르고 디테일로 들어가면 적용이 안 되어 있고,
    한번 디테일 들어갔다온 후로는 홈에서 isLike 적용한 내용이 잘 반영됨.
    => 왜 이렇게 되는지 추가 학습하고 고치기
*/