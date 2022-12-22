
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Box,
  } from '@chakra-ui/react'

export default function BasicUsage() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
        <Button onClick={onOpen}>Open Modal</Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent paddingBottom={'100px'}>
            <ModalHeader textAlign={"center"} fontSize={'md'} fontWeight="semibold"height={'fit-content'} padding="10px">Create new post</ModalHeader>
            <hr/>
            <ModalCloseButton />
            <ModalBody>
             <Box height={64} w="full" border="1px solid red" >

            <img src="https://cdn-icons-png.flaticon.com/512/3342/3342137.png" alt="drag icon"/>
              
             </Box>
            </ModalBody>

          </ModalContent>
        </Modal>
      </>
    )
  }

