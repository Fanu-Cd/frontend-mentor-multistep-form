import { Box, Checkbox, Flex, Stack, Text } from "@mantine/core";
import React from "react";
interface optionType {
  title: string;
  description: string;
  amount: string;
}

const AddOnOption = ({
  option,
  isSelected,
}: {
  option: optionType;
  isSelected: boolean;
}) => {
  return (
    <Box
      className={`w-full min-h-[3rem] rounded-md border p-2 ${
        isSelected ? `purple-600-border` : `gray-500-border`
      } purple-600-border-on-hover cursor-pointer`}
    >
      <Flex
        justify={"space-between"}
        align={"center"}
        className="!w-full !h-full"
      >
        <Checkbox color="hsl(243, 100%, 62%)" checked={isSelected} />
        <Stack gap={0} className="w-[70%]">
          <Text
            size="xs"
            fw={"bold"}
            className={`${isSelected ? "purple-600-txt" : "blue-950-txt"}`}
          >
            {option.title}
          </Text>
          <Text size="xs" className="gray-500-txt">
            {option.description}
          </Text>
        </Stack>
        <Text
          className={isSelected ? "purple-600-txt" : "blue-950-txt"}
          size="xs"
        >
          {option.amount}
        </Text>
      </Flex>
    </Box>
  );
};

export default AddOnOption;
