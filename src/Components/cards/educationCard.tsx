import { Box, Flex, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import Colors from "../../constans/color";
import { useState } from "react";

interface EducationProps {
  imageProduct?: string;
  altProduct?: string;
  productName?: string;
  desc?: string;
  price?: string;
}

const EducationCard: React.FC<EducationProps> = ({ productName, desc }) => {
  const [sentences, setSentences] = useState<string[]>([]);

  // Memecah deskripsi menjadi kalimat-kalimat terpisah
  useState(() => {
    if (desc) {
      const sentencesArray = desc.split(". ");
      setSentences(sentencesArray);
    }
  }, [desc]);

  return (
    <Box
      role="group"
      w="386px"
      h="170px"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      background={Colors.white}
      p={1}
    >
      <Flex alignItems="center">
        <Box background={Colors.pink} w="40px" h="40px" borderRadius="25px" />
        <Text
          fontSize="md"
          fontWeight="bold"
          width="100%"
          noOfLines={1}
          position="relative"
          right={5}
        >
          {productName}
        </Text>
      </Flex>
      <UnorderedList pl={3}>
        {/* Menggunakan map untuk membuat ListItem untuk setiap kalimat */}
        {sentences.map((sentence, index) => (
          <ListItem key={index}>{sentence.trim()}</ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};

export default EducationCard;
