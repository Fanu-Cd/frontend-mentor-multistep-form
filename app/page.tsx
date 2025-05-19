import { Center, Container } from "@mantine/core";
import Main from "./pages/main/main";

export default function Home() {
  return (
    <Container fluid className="w-full !p-0 !min-h-screen">
      <Center className="w-full !min-h-screen">
        <Main />
      </Center>
    </Container>
  );
}
