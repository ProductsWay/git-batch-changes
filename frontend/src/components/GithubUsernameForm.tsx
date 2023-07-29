import { Box, Button, Group, TextInput } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";

type FormValues = {
  username: string;
};

function GithubUsernameForm({
  onSubmitHandler,
}: {
  readonly onSubmitHandler: (data: FormValues) => void;
}) {
  const { handleSubmit, control } = useForm<FormValues>();
  const onSubmit = (data: FormValues) => {
    onSubmitHandler(data);
  };

  // TODO: add devtool
  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextInput
              label="Username"
              placeholder="Your Github Username"
              {...field}
            />
          )}
        />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}

export default GithubUsernameForm;
