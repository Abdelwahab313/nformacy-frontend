import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { makeStyles } from '@material-ui/core';
import { useAuth } from '../../context/auth';
import { getSaleWithUUID } from '../../apis/salesApi';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import WarningIcon from '@material-ui/core/SvgIcon/SvgIcon';
import { fetchClient } from '../../apis/clientsApi';
import { fetchUser } from '../../apis/usersApi';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { fetchProduct } from '../../product/productsApi';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: '#F5F5F5',
    padding: theme.spacing(1),
  },
  paper: {
    marginRight: theme.spacing(3),
    paddingLeft: theme.spacing(1),
    minWidth: '340px',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: '100%',
  },
  emptyContainer: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  productList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(2),
  },
  notFound: {
    color: 'red',
  },
}));
const SaleDetails = (props) => {
  const classes = useStyles();
  const { uuid } = useParams();
  const { authTokens } = useAuth();
  const [saleData, setSaleData] = useState(null);
  const [errors, setErrors] = useState();
  const [saleLoading, setSaleLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let tempSaleData;
    getSaleWithUUID(uuid, authTokens)
      .then((response) => {
        tempSaleData = response.data;
      })
      .then(async () => {
        const response = await fetchClient(tempSaleData.to, authTokens);
        tempSaleData = { ...tempSaleData, to: response.data };
      })
      .then(async () => {
        const response = await fetchUser(tempSaleData.by, authTokens);
        tempSaleData = { ...tempSaleData, by: response.data };
      })
      .then(async () => {
        await Promise.all(
          tempSaleData.products.map(async (product) => {
            const response = await fetchProduct(product.uuid, authTokens);
            delete product.uuid;
            product.data = response.data;
          }),
        );
      })
      .then(() => {
        setSaleData({
          ...tempSaleData,
        });
      })
      .catch((error) => {
        setErrors(error);
        setNotFound(true);
      })
      .finally(() => {
        setSaleLoading(false);
      });
  }, [uuid]);
  if (saleLoading) {
    return (
      <div className={classes.emptyContainer}>
        <CircularProgress />
      </div>
    );
  } else if (notFound) {
    return (
      <div className={classes.emptyContainer}>
        <Typography variant='h3' className={classes.notFound} gutterBottom>
          الفاتورة المطلوبة غير موجودة{' '}
          <WarningIcon className={classes.largeIcon} />
        </Typography>
      </div>
    );
  }
  if (saleLoading) {
    return (
      <div className={classes.emptyContainer}>
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <div className={classes.root} dir='rtl'>
        <div className={classes.productList}>
          <Paper className={classes.paper}>
            <p id={'title'}>تفاصيل الفاتورة</p>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={2} align='right'>
                    التاريخ
                  </TableCell>
                  <TableCell colSpan={2} align='left'>
                    {(() => {
                      const date = new Date(saleData.created);
                      return `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`;
                    })()}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>أسم العميل</TableCell>
                  <TableCell>{saleData.to.name}</TableCell>
                  <TableCell>أسم المندوب</TableCell>
                  <TableCell>{`${saleData.by.first_name} ${saleData.by.last_name}`}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </div>
        <div className={classes.productList}>
          <Paper className={classes.paper}>
            <p id={'title'}>تفاصيل المنتجات</p>
            <Table id={'client-info'}>
              <TableBody>
                <TableRow id={'tableHeader'}>
                  <TableCell>المنتج</TableCell>
                  <TableCell>السعر</TableCell>
                  <TableCell>الكمية</TableCell>
                  <TableCell>الاجمالى</TableCell>
                </TableRow>
                {saleData.products.map((product) => {
                  return (
                    <TableRow key={product.data.uuid} id={'clientName'}>
                      <TableCell>{product.data.name}</TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell>
                        {parseFloat(
                          product.price.substring(4, product.price.length),
                        ) * parseFloat(product.quantity)}
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow id={'address'}>
                  <TableCell colSpan={3} align='right'>
                    الحساب الكلي
                  </TableCell>
                  <TableCell colSpan={1} align='right'>
                    {saleData.total_price}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </div>
      </div>
    );
  }
};
export default SaleDetails;
