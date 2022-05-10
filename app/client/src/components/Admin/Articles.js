import React, {useState, useEffect} from 'react';

// Data Service
import { useDispatch } from 'react-redux';
import { retrieveAllItems } from '../../actions/items';

//Helper
import { useNavigate, Link } from 'react-router-dom';

// Material-UI
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';

//Components
import Admin from './Admin';

// Redux-Store
import store from "../../store";

const columns = [
  { id: 'title', label:'Name', minWidth: 170 },
  { id: 'description', label: 'Beschreibung', minWidth: 200 }
];

function AdminArticles() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isLoading, setisLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(retrieveAllItems())
            .then(() => {
                setItems(store.getState().items);
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
        <div className="overview-header">
          <h2>Alle Artikel</h2>
          <Button variant="contained" component={Link} to={"/admin/articles/newArticle"}>Neuer Artikel</Button>
        </div>
        <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: "30px" }}>
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
              { items &&
                    items
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item, index) => {
                      return (
                        <TableRow hover role="checkbox" onClick={() => { navigate(`/admin/articles/${item["id"]}`); }} tabIndex={-1} key={index}>
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
            count={items.length}
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

export default AdminArticles