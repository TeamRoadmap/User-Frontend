import { Heading } from "@chakra-ui/react";
import { Layout } from "../../dashboard/components";

export default function Leaderboard() {
  return (
    <Layout>
      <Heading>LeaderBoard</Heading>
    </Layout>
  );
}

export { getServerSideProps } from "../../shared/lib/chakra";
