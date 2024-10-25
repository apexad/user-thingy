import React from "react";
import type { ResponseUser } from "../../interfaces";
import { useRouter } from "next/router";
import useSwr from "swr";
import fetcher from "../../utils/fetcher";

import Avatar from "@mui/material/Avatar";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid2"

import Link from "next/link";

import { stringAvatar } from "../../utils/avatar";

export default function UserPage() {
  const { query } = useRouter();
  const { data, error, isLoading } = useSwr<ResponseUser>(
    query.id ? `/api/user/${query.id}` : null,
    fetcher,
  );

  if (error) return <div>Failed to load user</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;

  return <>
    <Breadcrumbs aria-label="breadcrumb">
      <Link href="/">
        User Thingy
      </Link>
      <Typography sx={{ color: 'text.primary' }}>{data.name}</Typography>
    </Breadcrumbs>
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <Chip
        avatar={<Avatar
          {...stringAvatar(data.name)}
          sx={{ width: 56, height: 56 }}
        />}
        label={data.name}
        variant="outlined"
      />
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemIcon>
          <LocationOnIcon />
          </ListItemIcon>
          <ListItemText primary={data.location} />
        </ListItem>
        {data.gender
          && <ListItem disablePadding>
               <ListItemIcon>
                 {data.gender === 'Male' ? <MaleIcon /> : <FemaleIcon />}
              </ListItemIcon>
              <ListItemText primary={data.gender} />
             </ListItem>
        }
        <ListItem disablePadding>
          <ListItemText primary="Friends" />
        </ListItem>
        <ListItem>
          <Grid container spacing={2}>
            {data.friends.map(friend => <Grid size={3} key={friend.id}><Link href="/user/[id]" as={`/user/${friend.id}`}><Chip label={friend.name} /></Link></Grid>)}
          </Grid>
        </ListItem>
      </List>
    </Box>
</>;
}
