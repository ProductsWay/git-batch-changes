import { GetGithubRepositories } from "../../wailsjs/go/main/App";
import { Flex, List, Loader, Title } from "@mantine/core";
import useSWR from "swr";

type Props = {
  username: string;
};

export default function GithubRepositories({ username }: Props) {
  const {
    isLoading,
    error,
    data = [],
  } = useSWR(username.length > 0 ? username: null, GetGithubRepositories);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error: {JSON.stringify(error, null, 2)}</p>;
  }

  return (
    <Flex
      direction={{ base: "column", sm: "row" }}
      gap={{ base: "sm", sm: "lg" }}
      justify={{ sm: "center" }}
    >
      <Title>Repositories of {username}</Title>
      <List>
        {data.map((repo) => <List.Item key={repo.id}>{repo.name}</List.Item>)}
      </List>
    </Flex>
  );
}
