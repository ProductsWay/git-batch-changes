import useSWR from "swr";
import { Center, List, Loader } from "@mantine/core";

import { GetGithubRepositories } from "../../wailsjs/go/main/App";

type Props = {
  username: string;
};

export default function GithubRepositories({ username }: Props) {
  const { isLoading, error, data = [] } = useSWR(
    username,
    GetGithubRepositories,
  );

  if (isLoading) return <Loader />;

  if (error) return <p>Failed to fetch</p>;

  return (
    <Center>

    <List>
      {data.map((repo) => <List.Item key={repo.id}>{repo.name}</List.Item>)}
    </List>
    </Center>
  );
}
