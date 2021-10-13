import { useState, useEffect } from 'react';
import * as React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import appleFilled from '@iconify/icons-ant-design/apple-filled';
// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { Card, Typography, Link } from '@material-ui/core';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';

import axios from 'axios';
import api from '../../../services.js';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.info.darker,
  backgroundColor: theme.palette.info.lighter
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
  color: theme.palette.info.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.info.dark, 0)} 0%, ${alpha(
    theme.palette.info.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

const TOTAL = 1352831;

export default function AppNewUsers() {
  const [total, setTotal] = useState();

  useEffect(() => {
    axios.get(api.TOTALSALES).then((res) => {
      setTotal(res.data.rows[0].sum);
      console.log(res.data.rows[0].sum);
    });
  }, []);

  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon={appleFilled} width={24} height={24} />
      </IconWrapperStyle>
      <Link underline="none" variant="subtitle2" component={RouterLink} to="/dashboard/sales">
        <Typography variant="h3">{total}</Typography>
        <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
          Sales
        </Typography>
      </Link>
    </RootStyle>
  );
}
