import { useState, useEffect } from 'react';
import * as React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import androidFilled from '@iconify/icons-ant-design/android-filled';
// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { Card, Typography, Link } from '@material-ui/core';
// import { Box, Card, Link, Container, Typography } from '@material-ui/core';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
import axios from 'axios';
import api from '../../../services.js'

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
    theme.palette.primary.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

const TOTAL = 714000;

export default function AppWeeklySales() {
  const [total, setTotal] = useState();


   useEffect(() => {
      axios.get(api.TOTALPRODUCTS)
      .then((res)=>{
        setTotal(res.data.rows[0].sum)
        console.log(res.data.rows[0].sum)
      })
    }, []);

  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon={androidFilled} width={24} height={24} />
      </IconWrapperStyle>
      <Link underline="none" variant="subtitle2" component={RouterLink} to="/dashboard/products">
      <Typography variant="h3">{fShortenNumber(total)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Products
      </Typography>
      </Link>
    </RootStyle>
  );
}
