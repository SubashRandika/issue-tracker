import { Text } from "@radix-ui/themes";
import Pagination from "./components/Pagination";

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return (
    <Text>
      Home Dashboard
    </Text>
  );
}
