"use client";
import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  GridCol,
  Group,
  SimpleGrid,
  Stack,
  Stepper,
  StepperStep,
  Switch,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { initialValues } from "../form/form-configs";
import * as yup from "yup";
import { schema } from "../form/form-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import arcadeIcon from "../../assets/icon-arcade.svg";
import advancedIcon from "../../assets/icon-advanced.svg";
import proIcon from "../../assets/icon-pro.svg";
import PlanCard from "@/app/components/form/plan-card";
import AddOnOption from "@/app/components/form/add-on-option";
import { IconInfoCircle } from "@tabler/icons-react";
import iconThankyou from "../../assets/icon-thank-you.svg";
import Image from "next/image";
import { useMediaQuery } from "@mantine/hooks";
const Main = () => {
  const stepperSteps = [
    { id: 1, title: "YOUR INFO" },
    { id: 2, title: "SELECT PLAN" },
    { id: 3, title: "ADD-ONS" },
    { id: 4, title: "SUMMARY" },
  ];

  type PersonalInfo = yup.InferType<typeof schema>;
  const [activeStep, setActiveStep] = useState(stepperSteps?.[0].id);
  const {
    register: registerPersonalInfo,
    formState: { errors: personalInfoErrors },
    handleSubmit: handlePersonalInfoSubmit,
  } = useForm<PersonalInfo>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const step1Fields = [
    { label: "Name", key: "name", placeholder: "e.g. Stephen King" },
    {
      label: "Email Address",
      key: "email",
      placeholder: "e.g. stephenking@lorem.com",
    },
    {
      label: "Phone Number",
      key: "phoneNumber",
      placeholder: "e.g. +1 234 567 890",
    },
  ];

  const onSubmitPersonalInfo = () => {
    setActiveStep(2);
  };

  const onNext = () => {
    if (activeStep === 1) {
      handlePersonalInfoSubmit(onSubmitPersonalInfo)();
    } else if (activeStep === 2) {
      setActiveStep(3);
    } else if (activeStep === 3) {
      if (onValidateAddon()) {
        setAddonError("");
        setActiveStep(4);
      } else {
        setAddonError("Please choose at least one option");
      }
    } else {
      setAreDetailsConfirmed(true);
    }
  };

  const onGoBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const FormStepHeader = (title: string, description: string) => {
    return (
      <Stack>
        <Title order={4} className="blue-950-txt">
          {title}
        </Title>
        <Text size="sm" className="gray-500-txt">
          {description}{" "}
        </Text>
      </Stack>
    );
  };

  const StepFooter = () => {
    return (
      <Group
        justify="space-between"
        align="center"
        hidden={activeStep === 4 && areDetailsConfirmed}
      >
        <Button
          className={`bg-transparent gray-500-txt ${
            activeStep === stepperSteps[0].id && `invisible`
          }`}
          type="button"
          variant="subtle"
          onClick={onGoBack}
        >
          Go Back
        </Button>
        <Button
          className={
            activeStep === 4
              ? "purple-600-bg purple-500-bg-on-hover"
              : "blue-950-bg"
          }
          onClick={onNext}
        >
          {activeStep === 4 ? "Confirm" : "Next Step"}
        </Button>
      </Group>
    );
  };

  const [step2PlanType, setStep2PlanType] = useState<"monthly" | "yearly">(
    "monthly"
  );

  const [step2Plan, setStep2Plan] = useState(1);

  const step2PlanCards = useMemo(
    () => [
      {
        id: 1,
        title: "Arcade",
        amount: step2PlanType === "yearly" ? "$90/yr" : "$9/mo",
        icon: arcadeIcon,
        more: "2 months free",
        type: step2PlanType,
      },
      {
        id: 2,
        title: "Advanced",
        amount: step2PlanType === "yearly" ? "$120/yr" : "$12/mo",
        icon: advancedIcon,
        more: "2 months free",
        type: step2PlanType,
      },
      {
        id: 3,
        title: "Pro",
        amount: step2PlanType === "yearly" ? "$150/yr" : "$15/mo",
        icon: proIcon,
        more: "2 months free",
        type: step2PlanType,
      },
    ],
    [step2PlanType]
  );

  const addOnsOptions = useMemo(
    () => [
      {
        id: 1,
        title: "Online service",
        description: "Access to multiplayer games",
        amount: step2PlanType === "yearly" ? "+$10/yr" : "+$1/mo",
      },
      {
        id: 2,
        title: "Larger storage",
        description: "Extra 1TB of cloud save",
        amount: step2PlanType === "yearly" ? "+$20/yr" : "+$2/mo",
      },
      {
        id: 3,
        title: "Customizable profile",
        description: "Custom theme on your profile",
        amount: step2PlanType === "yearly" ? "+$20/yr" : "+$2/mo",
      },
    ],
    [step2PlanType]
  );

  const [selectedAddOnOptions, setSelectedAddOnOptions] = useState<number[]>(
    []
  );
  const [addOnError, setAddonError] = useState("");

  const onValidateAddon = () => {
    return !!selectedAddOnOptions?.length;
  };

  const [areDetailsConfirmed, setAreDetailsConfirmed] = useState(false);

  const totalAmount = useMemo(() => {
    const selectedPlanDetails = step2PlanCards?.find((x) => x.id === step2Plan);
    const selectedAddonOptionsDetails = addOnsOptions?.filter((option) => {
      return selectedAddOnOptions?.includes(option.id);
    });

    const selectedPlanAmount = !selectedPlanDetails
      ? 0
      : Number(selectedPlanDetails?.amount?.split("$")?.[1]?.split("/")?.[0]);

    const selectedAddonsAmount = !selectedAddonOptionsDetails?.length
      ? 0
      : selectedAddonOptionsDetails?.reduce(
          (acc, item) =>
            acc + Number(item.amount?.split("$")?.[1]?.split("/")?.[0]),
          0
        );
    return selectedPlanAmount + selectedAddonsAmount;
  }, [step2Plan, selectedAddOnOptions, addOnsOptions, step2PlanCards]);

  const isSmallScreen = useMediaQuery("(max-width:640px)");

  return (
    <Container
      fluid
      className="w-[90%] md:w-[75%] lg:w-[60%] min-h-[15rem] blue-50-bg !p-5"
    >
      <Grid className="w-full" justify="space-between">
        <GridCol
          span={{ base: 12, sm: 3 }}
          className={`!p-5  ${
            isSmallScreen
              ? `min-h-[10rem] sidebar-bg-sm`
              : `sidebar-bg !rounded-l-md`
          }`}
        >
          <Stepper
            active={activeStep}
            orientation={isSmallScreen ? "horizontal" : "vertical"}
            onStepClick={(x) => setActiveStep(x)}
            classNames={{
              stepLabel: isSmallScreen ? "hidden" : "gray-500-txt",
              stepDescription: isSmallScreen ? "hidden" : "white-txt",
              stepIcon: "!bg-transparent white-txt",
              stepCompletedIcon: "blue-300-bg rounded-full",
              separator: isSmallScreen ? "!mr-2" : "",
            }}
          >
            {stepperSteps.map((step) => (
              <StepperStep
                key={step.id}
                label={`Step ${step.id}`}
                description={step.title}
                icon={<Box>{step.id}</Box>}
                completedIcon={<Box className="text-black">{step.id}</Box>}
              />
            ))}
          </Stepper>
        </GridCol>
        <GridCol span={{ base: 12, sm: 8 }}>
          <Stack
            className={`${
              isSmallScreen && `relative bottom-[10%] bg-white rounded-md p-4`
            }`}
          >
            {activeStep === 1 && (
              <Stack className="w-full" gap={2}>
                {FormStepHeader(
                  "Personal info",
                  "Please provide your name, email address and phone number."
                )}
                <form className="mt-5 flex flex-col gap-3">
                  {step1Fields.map((field) => (
                    <TextInput
                      key={field.key}
                      label={field.label}
                      placeholder={field.placeholder}
                      classNames={{
                        label: "blue-950-txt",
                        error: "float-right",
                        input: "blue-500-border-on-focus",
                      }}
                      {...registerPersonalInfo(field.key as keyof PersonalInfo)}
                      error={
                        personalInfoErrors?.[field.key as keyof PersonalInfo]
                          ?.message
                      }
                    />
                  ))}
                </form>
              </Stack>
            )}
            {activeStep === 2 && (
              <Stack>
                {FormStepHeader(
                  "Select your plan",
                  "You have the option of monthly or yearly billing"
                )}
                <SimpleGrid cols={{ base: 1, sm: 3 }}>
                  {step2PlanCards.map((card) => (
                    <Box
                      key={card.title}
                      onClick={() => {
                        setStep2Plan(card.id);
                      }}
                    >
                      <PlanCard
                        card={card}
                        isSelected={step2Plan === card.id}
                      />
                    </Box>
                  ))}
                </SimpleGrid>
                <Box className="blue-100-bg w-full flex justify-center items-center p-2 rounded-md">
                  <Group>
                    <Text className="v">Monthly</Text>
                    <Switch
                      color="hsl(213, 96%, 18%)"
                      checked={step2PlanType === "yearly"}
                      onChange={(x) => {
                        setStep2PlanType(
                          x.target.checked ? "yearly" : "monthly"
                        );
                        setSelectedAddOnOptions([]);
                      }}
                    />
                    <Text className="blue-950-txt">Yearly</Text>
                  </Group>
                </Box>
              </Stack>
            )}
            {activeStep === 3 && (
              <Stack>
                {FormStepHeader(
                  "Pick add-ons",
                  "Add-ons help enhance your gaming experience"
                )}
                {addOnsOptions.map((option) => (
                  <Box
                    key={option.id}
                    onClick={() => {
                      if (selectedAddOnOptions.includes(option.id)) {
                        setSelectedAddOnOptions(
                          selectedAddOnOptions.filter((x) => x !== option.id)
                        );
                      } else
                        setSelectedAddOnOptions((prev) => [...prev, option.id]);
                    }}
                  >
                    <AddOnOption
                      option={option}
                      isSelected={selectedAddOnOptions.includes(option.id)}
                    />
                  </Box>
                ))}
                {addOnError && (
                  <Alert icon={<IconInfoCircle />} color="red" mt={3}>
                    {addOnError}
                  </Alert>
                )}
                <Box className="blue-100-bg w-full flex justify-center items-center p-2 rounded-md">
                  <Group>
                    <Text className="v">Monthly</Text>
                    <Switch
                      color="hsl(213, 96%, 18%)"
                      checked={step2PlanType === "yearly"}
                      readOnly
                    />
                    <Text className="blue-950-txt">Yearly</Text>
                  </Group>
                </Box>
              </Stack>
            )}
            {activeStep === 4 &&
              (areDetailsConfirmed ? (
                <Stack justify="center" align="center">
                  <Image src={iconThankyou} alt="Thank you icon" />
                  <Text fw={"bold"} className="blue-950-txt">
                    Thank you!
                  </Text>
                  <Text className="gray-500-txt text-center">
                    Thanks for confirming your subscription! We hope you have
                    fun using our platform. If you ever need support, please
                    feel free to email us at support@loremgaming.com.
                  </Text>
                </Stack>
              ) : (
                <Stack>
                  {FormStepHeader(
                    "Finishing up",
                    "Double-check everything looks OK before confirming"
                  )}
                  <Box>
                    <Flex justify={"space-between"} align="center">
                      <Stack gap={0} align="start">
                        <Text className="blue-950-txt" fw={"bold"}>
                          {`${
                            step2PlanCards?.find((x) => x.id === step2Plan)
                              ?.title
                          } (${step2PlanType})`}
                        </Text>
                        <Button
                          variant="transparent"
                          className="!underline gray-500-txt purple-600-txt-on-hover"
                          onClick={() => {
                            setActiveStep(2);
                          }}
                          p={0}
                        >
                          Change
                        </Button>
                      </Stack>
                      <Text className="blue-950-txt" fw={"bold"} size="sm">
                        {`${
                          step2PlanCards?.find((x) => x.id === step2Plan)
                            ?.amount
                        }`}
                      </Text>
                    </Flex>
                  </Box>
                  <Divider />
                  <Stack gap={1}>
                    {selectedAddOnOptions?.map((option) => {
                      const optionDetails = addOnsOptions.find(
                        (x) => x.id === option
                      );
                      return (
                        <Flex key={option} justify={"space-between"}>
                          <Text className="gray-500-txt">
                            {optionDetails?.title}
                          </Text>
                          <Text className="blue-950-txt" size="xs">
                            {optionDetails?.amount}
                          </Text>
                        </Flex>
                      );
                    })}
                  </Stack>
                  <Divider />
                  <Flex justify={"space-between"}>
                    <Text className="gray-500-txt">Total (per month)</Text>
                    <Text className="purple-600-txt" size="lg" fw={"bold"}>
                      {`+$${totalAmount}/${
                        step2PlanType === "monthly" ? "mo" : "yr"
                      }`}
                    </Text>
                  </Flex>
                </Stack>
              ))}
          </Stack>
          {!isSmallScreen && (
            <Box mt={15}>
              <StepFooter />
            </Box>
          )}
        </GridCol>
        {isSmallScreen && (
          <GridCol span={12}>
            <Box>
              <StepFooter />
            </Box>
          </GridCol>
        )}
      </Grid>
    </Container>
  );
};

export default Main;
