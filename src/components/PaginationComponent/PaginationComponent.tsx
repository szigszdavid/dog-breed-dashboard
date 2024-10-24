import { Button, Typography } from "@mui/material";
import "./PaginationComponent.css";

function PaginationComponent({
  page,
  onPreviousPage,
  onNextPage,
  isFetching,
  nextDisabled,
}: any) {
  return (
    <div className="pagination-container">
      <Button
        variant="contained"
        onClick={onPreviousPage}
        disabled={page === 1 || isFetching}
      >
        Previous
      </Button>
      <Typography variant="h6" gutterBottom>
        {page}
      </Typography>
      <Button
        variant="contained"
        onClick={onNextPage}
        disabled={isFetching || nextDisabled}
      >
        Next
      </Button>
    </div>
  );
}

export default PaginationComponent;
