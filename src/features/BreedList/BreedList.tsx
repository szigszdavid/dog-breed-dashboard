import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableSortLabel,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useBreeds } from "../../hooks/useBreeds";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import "./BreedList.css";
import PaginationComponent from "../../components/PaginationComponent/PaginationComponent";

function DogList() {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<"name" | "life_span">("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBreedGroup, setSelectedBreedGroup] = useState("");
  const [sortedBreeds, setSortedBreeds] = useState<any[]>([]);
  const navigate = useNavigate();

  const limit = 10;

  const { data: breeds, isLoading, isError, error, isFetching } = useBreeds();

  const handleSortChange = (property: "name" | "life_span") => {
    const isAsc = sortBy === property && sortDirection === "asc";
    setSortDirection(isAsc ? "desc" : "asc");
    setSortBy(property);
    setPage(1);
  };

  const breedGroups = useMemo<string[]>(
    () =>
      breeds
        ? Array.from(
            new Set(
              breeds.map((breed: any) => breed.breed_group).filter(Boolean)
            )
          )
        : [],
    [breeds]
  );

  useEffect(() => {
    if (breeds) {
      const filteredBreeds = breeds.filter((breed: any) => {
        const matchesSearchQuery = breed.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesBreedGroup = selectedBreedGroup
          ? breed.breed_group === selectedBreedGroup
          : true;
        return matchesSearchQuery && matchesBreedGroup;
      });

      const sortedData = filteredBreeds.sort((a: any, b: any) => {
        if (sortBy === "name") {
          return sortDirection === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        } else if (sortBy === "life_span") {
          const getLifeSpan = (lifeSpan: string) => {
            const match = lifeSpan.match(/\d+/);
            return match ? parseInt(match[0], 10) : 0;
          };
          const aLife = getLifeSpan(a.life_span);
          const bLife = getLifeSpan(b.life_span);
          return sortDirection === "asc" ? aLife - bLife : bLife - aLife;
        }
        return 0;
      });

      const startIndex = (page - 1) * limit;
      const paginatedData = sortedData.slice(startIndex, startIndex + limit);

      setSortedBreeds(paginatedData);
    }
  }, [breeds, searchQuery, sortBy, sortDirection, page, selectedBreedGroup]);

  const handleRowClick = (breed: (typeof sortedBreeds)[0]) => {
    navigate(`/breed/${breed.id}`);
  };

  if (isLoading || isFetching)
    return (
      <LoadingComponent message="Loading the selected breed's image. Please wait" />
    );

  if (isError)
    return (
      <ErrorComponent message={`Error fetching breeds: ${error.message}`} />
    );

  return (
    <>
      <TextField
        label="Search by Breed Name"
        variant="outlined"
        fullWidth
        margin="normal"
        color="secondary"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setPage(1);
        }}
        sx={{
          input: { color: "white" },
          label: { color: "white" },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
        }}
      />

      <FormControl fullWidth margin="normal">
        <InputLabel id="breed-group-label" sx={{ color: "white" }}>
          Filter by Breed Group
        </InputLabel>
        <Select
          labelId="breed-group-label"
          value={selectedBreedGroup}
          label="Filter by Breed Group"
          sx={{
            color: "white",
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
          }}
          onChange={(e) => {
            setSelectedBreedGroup(e.target.value);
            setPage(1);
          }}
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          {breedGroups.map((group: string) => (
            <MenuItem key={group} value={group}>
              {group}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <PaginationComponent
        page={page}
        onPreviousPage={() => setPage((prev) => Math.max(prev - 1, 1))}
        onNextPage={() => setPage((prev) => prev + 1)}
        isFetching={isFetching}
        nextDisabled={isFetching || sortedBreeds.length < limit}
      />
      <TableContainer component={Paper}>
        <Table aria-label="dog breeds table">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell
                sortDirection={sortBy === "name" ? sortDirection : false}
              >
                <TableSortLabel
                  active={sortBy === "name"}
                  direction={sortBy === "name" ? sortDirection : "asc"}
                  onClick={() => handleSortChange("name")}
                >
                  Breed Name
                  {sortBy === "name" ? (
                    <span>
                      {sortDirection === "asc"
                        ? "sorted ascending"
                        : "sorted descending"}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell>Breed Group</TableCell>
              <TableCell
                sortDirection={sortBy === "life_span" ? sortDirection : false}
              >
                <TableSortLabel
                  active={sortBy === "life_span"}
                  direction={sortBy === "life_span" ? sortDirection : "asc"}
                  onClick={() => handleSortChange("life_span")}
                >
                  Life Expectancy
                  {sortBy === "life_span" ? (
                    <span>
                      {sortDirection === "asc"
                        ? "sorted ascending"
                        : "sorted descending"}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedBreeds.map((breed: any) => (
              <TableRow key={breed.id} onClick={() => handleRowClick(breed)}>
                <TableCell>
                  <img src={breed.image?.url} alt={breed.name} />
                </TableCell>
                <TableCell>{breed.name}</TableCell>
                <TableCell>{breed.breed_group || "N/A"}</TableCell>
                <TableCell>{breed.life_span}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PaginationComponent
        page={page}
        onPreviousPage={() => setPage((prev) => Math.max(prev - 1, 1))}
        onNextPage={() => setPage((prev) => prev + 1)}
        isFetching={isFetching}
        nextDisabled={isFetching || sortedBreeds.length < limit}
      />
    </>
  );
}

export default DogList;
