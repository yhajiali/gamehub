import {
  Button,
  HStack,
  Heading,
  Image,
  List,
  ListItem,
  Spinner,
} from "@chakra-ui/react";
import useGenres, { Genre } from "../hooks/useGenres";
import getCroppedImageUrl from "../services/image-url";

interface Props {
  onSelectGenre: (genre: Genre) => void;
  selectedGenreId?: number;
}

export const GenreList = ({ onSelectGenre, selectedGenreId }: Props) => {
  const { data, isLoading, error } = useGenres();

  // To be implemented if fetching data
  if (error) return null;

  if (isLoading) return <Spinner />;

  return (
    <>
      <Heading fontSize={"2xl"} marginY={5}>
        Genres
      </Heading>
      <List>
        {data?.results.map((genre) => (
          <ListItem key={genre.id} paddingY={"5px"}>
            <HStack>
              <Image
                boxSize={"32px"}
                borderRadius={8}
                objectFit={"cover"}
                src={getCroppedImageUrl(genre.image_background)}
              />
              <Button
                onClick={() => onSelectGenre(genre)}
                fontSize="lg"
                fontWeight={genre.id === selectedGenreId ? "bold" : "normal"}
                variant={"link"}
                whiteSpace={"normal"}
                textAlign={"left"}
              >
                {genre.name}
              </Button>
            </HStack>
          </ListItem>
        ))}
      </List>
    </>
  );
};
