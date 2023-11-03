// import { ViewIcon } from "@chakra-ui/icons";
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   Button,
//   // useDisclosure,
//   IconButton,
//   Text,
//   Image,
//   useDisclosure,
// } from "@chakra-ui/react";

// const ProfileModal = (user, children) => {
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   return (
//     <>
//       {children ? (
//         <span onClick={onOpen}>{children}</span>
//       ) : (
//         <IconButton display={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
//       )}
//       <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
//         <ModalOverlay />
//         <ModalContent h="410px">
//           <ModalHeader
//             fontSize="40px"
//             fontFamily="Work sans"
//             display="flex"
//             justifyContent="center"
//           >
//             {user.name}
//           </ModalHeader>
//           <ModalCloseButton />
//           <ModalBody
//             display="flex"
//             flexDir="column"
//             alignItems="center"
//             justifyContent="space-between"
//           >
//             <Image
//               borderRadius="full"
//               boxSize="150px"
//               src={user.pic}
//               alt={user.name}
//             />
//             <Text
//               fontSize={{ base: "28px", md: "30px" }}
//               fontFamily="Work sans"
//             >
//               Email: {user.email}
//             </Text>
//           </ModalBody>
//           <ModalFooter>
//             <Button onClick={onClose}>Close</Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// };

// export default ProfileModal;

import { ViewIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  IconButton,
  Text,
  Image,
  useDisclosure,
} from "@chakra-ui/react";

const ProfileModal = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // console.log('props: ', props);
  const { user, children } = props; 

  // const userData = user.data;

  // console.log("username:", user)
  // console.log("email:", userData.email)
  // console.log("pic:", userData.pic)
  // console.log("children:", children)

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          display={{ base: "flex" }}
          icon={<ViewIcon />}
          onClick={onOpen}
        />
      )}
      <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent h="410px">
          <ModalHeader
            fontSize="40px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Image
              borderRadius="full"
              boxSize="150px"
              src={user.pic}
              alt={user.name}
            />
            <Text
              fontSize={{ base: "28px", md: "30px" }}
              fontFamily="Work sans"
            >
              Email: {user.email}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;

