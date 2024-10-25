import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React from "react";
import useSwr from "swr";
import Link from "next/link";
import fetcher from "../utils/fetcher";

import Avatar from "@mui/material/Avatar";
import Box from '@mui/material/Box';
import Chip from "@mui/material/Chip";
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';

import { stringAvatar } from "../utils/avatar";

import type { User } from "../interfaces";

export default function Index() {
  const { data, error, isLoading } = useSwr<User[]>("/api/users", fetcher);

  if (error) return <div>Failed to load users</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;

  return (
    <Box sx={{ width: '100%' }}>
        <Typography variant="h1" gutterBottom>
        User thingy
      </Typography>
      <Grid container spacing={2}>
        {data.map((user) => (
            <Grid size={3} key={user.id}>
                <Link href="/user/[id]" as={`/user/${user.id}`}>
                    <Chip
                    avatar={<Avatar {...stringAvatar(user.name)} />}
                    label={user.name}
                    variant="outlined"
                    />
                </Link>
            </Grid>
        ))}
      </Grid>
    </Box>
  );
}
