import { FormControl, InputLabel, MenuItem, Box, Select, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { DomainContext, ROOT_DOMAIN, useUserDomain } from 'src/contexts/DomainProvider'

export const DomainSelector = () => {
  const userDomain = useUserDomain()
  const selectedDomain = useContext(DomainContext)

  const router = useRouter()

  return (
    <Box>
      {userDomain === ROOT_DOMAIN ? (
        <FormControl fullWidth size="small">
          <InputLabel>Domain</InputLabel>
          <Select
            label="Domain"
            value={selectedDomain}
            onChange={(e) => router.push(`/${e.target.value}`)}
          >
            <MenuItem value="demo">Demo</MenuItem>
            <MenuItem value="thinkval">ThinkVAL</MenuItem>
            <MenuItem value="saladstop">Salad Stop!</MenuItem>
            <MenuItem value="kctsoya">KCT Soya</MenuItem>
          </Select>
        </FormControl>
      ) : (
        <Typography>{userDomain}</Typography>
      )}
    </Box>
  )
}
