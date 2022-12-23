/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { validator } from "../api/validator";
import { FormData } from "../types";

const placeholder = `
{
  "messages": [
    {
      "type": "text",
      "text": "Hello, world"
    }
  ]
}
`.trim();

export default function Home() {
  const [result, setResult] = useState("");
  const {
    register,
    setValue,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit(async (data) => {
    await chrome.storage.local.set(data);
    await validator(
      data.token,
      JSON.parse(data.body),
      () => setResult("Success!"),
      (validateError) => setResult(JSON.stringify(validateError, null, 2)),
      (_) => setResult("unknown error")
    );
  });

  useEffect(() => {
    chrome.storage.local.get(["token", "body"], (items) => {
      const data = items as FormData;
      const body = data && data.body ? data.body : placeholder;
      setValue("token", data.token);
      setValue("body", body);
    });
  }, []);

  return (
    <>
      <Box w="540px">
        <Box bg="#4299E1" w="100%" p={4} color="white">
          <Heading as="h3" size="xl" isTruncated>
            LINE Message Validator
          </Heading>
        </Box>
        <form onSubmit={onSubmit}>
          <FormControl isInvalid={!!errors.body || !!errors.token} isRequired>
            <FormLabel>channel access token</FormLabel>
            <Input
              placeholder="CHANNEL ACCESS TOKEN"
              {...register("token", { required: true })}
            />
            <FormErrorMessage>
              {!!errors.token && "channel access token is required"}
            </FormErrorMessage>
            <FormLabel>messages(JSON)</FormLabel>
            <Textarea
              placeholder={placeholder}
              h="200"
              {...register("body", { required: true })}
            />
            <FormErrorMessage>
              {!!errors.body && "messages(JSON) is required"}
            </FormErrorMessage>
          </FormControl>
          <FormLabel>result</FormLabel>
          <Textarea value={result} h="100" />
          <Button
            mt={2}
            bg="#4299E1"
            color="white"
            isLoading={formState.isSubmitting}
            type="submit"
          >
            validate
          </Button>
        </form>
      </Box>
    </>
  );
}
