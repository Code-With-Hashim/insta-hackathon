import React, { useEffect, useState } from "react";
import Image from "next/image";

import { AiOutlineHeart, AiOutlineComment } from "react-icons/ai";
import { BsHandThumbsUp, BsHandThumbsDown } from "react-icons/bs";
import {
  Card,
  CardHeader,
  Stack,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Divider,
  ButtonGroup,
  Button,
  Box,
  Input,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import axios from "axios";

const HomePage = () => {
  const [likes, setLikes] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [cmnt, setCmnt] = useState("");
  const [commentRender, setCommentRender] = useState(true);
  const likeDislike = (el) => {
    if (likes) {
      return <BsHandThumbsUp size="25px" onClick={() => setLikes(!likes)} />;
    } else {
      return <BsHandThumbsDown size="25px" onClick={() => setLikes(!likes)} />;
    }
  };
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyX2lkIjoiNjNhNTU0MTljOWJmMWQyZDYyYTM4ZmNkIiwidXNlcm5hbWUiOiJyYW5kb20iLCJpYXQiOjE2NzE3ODE1MjV9.GscWMi6HTq-ZHIHIEn88EqzUHIz1InXB16k-oRi_XiU";
 
  const handleChangeComment = (e) => {
    setCmnt(e.target.value);
  };
  const handleComment = async (el) => {
    console.log(cmnt);
    const comment = {
      postId: el._id,
      text: cmnt,
    };
    await axios
      .put("http://localhost:8080/comments", comment, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCmnt(null)
        console.log("Comment", res);
        setCommentRender(!commentRender);
        
      });
      setCmnt("")
  };
const handleLike=async(el)=>{
  const comment = {
    postId: el._id,
  };
  try{
    await axios
    .put("http://localhost:8080/likes", comment, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      
      console.log("Comment", res);
      setCommentRender(!commentRender);
      
    });
  }catch(error){
    await axios
    .put("http://localhost:8080/unlikes", comment, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      
      console.log("Comment", res);
      setCommentRender(!commentRender);
      
    });
  }
}
  useEffect(() => {
    axios
      .get("http://localhost:8080/allUserPost", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data);
      });
  }, [commentRender]);
  return (
    <Box ml="30%">
      {data &&
        data?.map((el) => (
          <Card maxW="sm">
            <CardBody>
              <Stack mt="6" spacing="3">
                <img src={el.photo} />
                <Box display="flex" size="lg" gap="1rem">
                  <Box display="flex">
                    <Box>
                    <BsHandThumbsUp size="25px" onClick={()=>handleLike(el)}/>
                    </Box>
                    <Box>
                      {}
                      <Text size="md">{el.likes?.length}</Text>
                    </Box>
                  </Box>
                  <AiOutlineComment size="25px" />
                </Box>
                <Text noOfLines="1">{el.body}</Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter display="block">
              <InputGroup>
                <Input
                  onChange={handleChangeComment}
                  placeholder="Add a comment...."
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={() => handleComment(el)}
                  >
                    Post
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Box
                sx={{
                  "&::-webkit-scrollbar": {
                    width: "1px",
                    height: "1px",
                    borderRadius: "0",
                    backgroundColor: `rgba(0, 0, 0, 0.05)`,
                  },
                }}
                height="80px"
                // border="1px solid"
                overflow="scroll"
              >
                {el.comments?.map((com) => (
                  <Box display="flex" m="0.5rem">
                    <AiOutlineComment size="20px" />
                    <Text ml="0.8rem">
                      {" "}
                      {com.text} --({com.username})
                    </Text>
                  </Box>
                ))}
              </Box>
            </CardFooter>
          </Card>
        ))}
    </Box>
  );
};

export default HomePage;
