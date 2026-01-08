// src/pages/admin/ViewEnquiries.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Alert,
  TextField,
  TablePagination,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { getEnquiries, deleteEnquiry } from '../../api/apiRoutes';

const ViewEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await getEnquiries();
        const data = response.data?.enquiries || response.data || [];
        const array = Array.isArray(data) ? data : [];
        setEnquiries(array);
        setFiltered(array);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load enquiries');
      } finally {
        setLoading(false);
      }
    };
    fetchEnquiries();
  }, []);

  // Search Filter
  useEffect(() => {
    const lower = search.toLowerCase();
    const result = enquiries.filter(
      (enq) =>
        enq.name?.toLowerCase().includes(lower) ||
        enq.email?.toLowerCase().includes(lower) ||
        enq.company?.toLowerCase().includes(lower) ||
        enq.message?.toLowerCase().includes(lower)
    );
    setFiltered(result);
    setPage(0); // Reset to first page
  }, [search, enquiries]);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this enquiry?')) {
      try {
        await deleteEnquiry(id);
        setEnquiries(enquiries.filter((enq) => enq._id !== id));
      } catch (err) {
        setError('Failed to delete enquiry');
      }
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 5 }} />;
  if (error) return <Alert severity="error" sx={{ m: 3 }}>{error}</Alert>;

  const paginated = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        View Enquiries
      </Typography>

      {/* Search Bar */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search by name, email, company, or message..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      {filtered.length === 0 ? (
        <Alert severity="info">No enquiries found.</Alert>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Email</strong></TableCell>
                  <TableCell><strong>Company</strong></TableCell>
                  <TableCell><strong>Message</strong></TableCell>
                  <TableCell><strong>Interested In</strong></TableCell>
                  <TableCell><strong>Date</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginated.map((enq) => (
                  <TableRow key={enq._id} hover>
                    <TableCell>{enq.fullName}</TableCell>
                    <TableCell>{enq.email}</TableCell>
                    <TableCell>{enq.company}</TableCell>
                    <TableCell>{enq.message}</TableCell>
                    <TableCell>{enq.interestedIn}</TableCell>
                    <TableCell>{new Date(enq.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button
                        color="error"
                        size="small"
                        onClick={() => handleDelete(enq._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <TablePagination
            component="div"
            count={filtered.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
            labelRowsPerPage="Rows per page:"
            sx={{ mt: 2 }}
          />
        </>
      )}
    </Box>
  );
};

export default ViewEnquiries;