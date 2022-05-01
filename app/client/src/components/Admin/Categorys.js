import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { retrieveCats } from '../../actions/categorys';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Admin from './Admin';
import store from "../../store";

const columns = [
  { id: 'title', label:'Name', minWidth: 170 },
];

function AdminCategorys() {
  const [cats, setCats] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isLoading, setisLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(retrieveCats())
            .then(() => {
              setCats(store.getState().cats);
            }).catch((err) => {
                console.log(err);
            });
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  return (
    <div className="admin-content">
      <div className="left-content"><Admin /></div>
      <div className="right-content">
        <h2>Alle Kategorien</h2>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 800 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {
                    columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        { column.label }
                      </TableCell>
                    ))
                  }
                </TableRow>
              </TableHead>
              <TableBody>
              { cats &&
                    cats
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item, index) => {
                      return (
                        <TableRow hover role="checkbox" onClick={() => { navigate(`/admin/categorys/${item["id"]}`); }} tabIndex={-1} key={index}>
                          {
                            columns.map((column) => {
                              const value = item[column.id];
                                return (
                                  <TableCell key={column.id} align={column.align}>
                                    { value }
                                  </TableCell>
                                )
                            })
                          }
                        </TableRow>
                      );
                    } )
                }
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={cats.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  )
}

export default AdminCategorys