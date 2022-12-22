import React from "react";
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

const Array = [1, 2, 3, 4];
const HomePage = () => {
  const [likes, setLikes] = React.useState(true);
  const likeDislike = () => {
    if (likes) {
      return <BsHandThumbsUp size="25px" onClick={() => setLikes(!likes)} />;
    } else {
      return <BsHandThumbsDown size="25px" onClick={() => setLikes(!likes)} />;
    }
  };
  return (
    <Box ml="30%">
      {Array.map((el) => (
        <Card maxW="sm">
          <CardBody>
            <Stack mt="6" spacing="3">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2B3IACx2B6NDxfffoabXTeRZb6oYFTX9uQjBkG4WB&s" />
              <Box display="flex" size="lg" gap="1rem">
                <Box>{likeDislike()}</Box>
                <AiOutlineComment size="25px" />
              </Box>
              <Text noOfLines="1">
                This sofa is perfect for modern tropical spaces, baroque
                inspired s.
              </Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <InputGroup>
              <Input placeholder="Add a comment...." />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm">
                  Post
                </Button>
              </InputRightElement>
            </InputGroup>
          </CardFooter>
        </Card>
      ))}
    </Box>
  );
};

export default HomePage;
