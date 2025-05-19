import { Box, Stack, Text } from "@mantine/core";
import Image from "next/image";
import React from "react";
interface PlanCardType {
  title: string;
  icon: string;
  amount: string;
  type: "monthly" | "yearly";
  more?: string;
}

const PlanCard = ({
  card,
  isSelected,
}: {
  card: PlanCardType;
  isSelected: boolean;
}) => {
  return (
    <Box
      className={`flex sm:flex-col items-center sm:items-start sm:justify-between w-full sm:min-h-[10rem] border rounded-md cursor-pointer ${
        isSelected ? `purple-600-border` : `gray-500-border`
      }  purple-600-border-on-hover p-3 gap-2`}
    >
      <Image src={card.icon} alt="Icon" />
      <Stack gap={0} className="!max-w-full">
        <Text className="blue-950-txt !max-w-full !break-words" fw={"bold"}>
          {card.title}
        </Text>
        <Text className="gray-500-txt !max-w-full !break-words">{card.amount}</Text>
        {card?.type === "yearly" && (
          <Text className="blue-950-txt" size="sm">
            {card.more}
          </Text>
        )}
      </Stack>
    </Box>
  );
};

export default PlanCard;
