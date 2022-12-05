import { GetGithubRepositories } from "../../wailsjs/go/main/App";
import { Flex, List, Loader, Title } from "@mantine/core";
import useSWR from "swr";

type Props = {
  username: string;
  page?: number;
};

// TODO: support pagination
export default function GithubRepositories({ username, page = 1 }: Props) {
  const {
    isLoading,
    error,
    data = [],
  } = useSWR(
    username.length > 0 ? [username, page] : null,
    () => GetGithubRepositories(username, page),
  );

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error: {JSON.stringify(error, null, 2)}</p>;
  }

  return (
    <Flex
      direction={{ base: "column" }}
      gap={{ base: "sm", sm: "lg" }}
      justify={{ sm: "center" }}
    >
      <Title>Repositories of {username} - Page {page}</Title>
      <List>
        {data.map((repo) => <List.Item key={repo.id}>{repo.name}</List.Item>)}
      </List>
    </Flex>
  );
}
