import { useState } from 'react';
// icons
import searchIcon from '@iconify/icons-carbon/search';
import filterIcon from '@iconify/icons-carbon/filter';
// @mui
import { Stack, Button, Drawer, Box } from '@mui/material';
// config
import { DRAWER_WIDTH } from '../../../config';
// components
import { Iconify } from '../../../components';
//
import PromotionItemTypeFilter from './PromotionItemTypeFilter';
import PromotionItemLevelFilter from './PromotionItemLevelFilter';
import PromotionItemSalaryFilter from './PromotionItemSalaryFilter';
import PromotionItemKeywordFilter from './PromotionItemKeywordFilter';
import PromotionItemBenefitsFilter from './PromotionItemBenefitsFilter';
import PromotionItemLocationsFilter from './PromotionItemLocationsFilter';
import PromotionItemCategoriesFilter from './PromotionItemCategoriesFilter';

// ----------------------------------------------------------------------

const defaultValues = {
  filterKeyword: null,
  filterCategories: null,
  filterLocation: null,
  filterType: [],
  filterLevel: [],
  filterBenefits: [],
  filterSalary: [0, 20000],
};

export default function PromotionItemBarFilters() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const [filters, setFilters] = useState(defaultValues);

  const handleMobileOpen = () => {
    setMobileOpen(true);
  };

  const handleMobileClose = () => {
    setMobileOpen(false);
  };

  const handleChangeKeyword = (keyword) => {
    setFilters({
      ...filters,
      filterKeyword: keyword,
    });
  };

  const handleChangeCategory = (keyword) => {
    setFilters({
      ...filters,
      filterCategories: keyword,
    });
  };

  const handleChangeLocation = (keyword) => {
    setFilters({
      ...filters,
      filterLocation: keyword,
    });
  };

  const handleChangeJobType = (event) => {
    const {
      target: { value },
    } = event;
    setFilters({
      ...filters,
      filterType: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const handleChangeJobLevel = (event) => {
    const {
      target: { value },
    } = event;
    setFilters({
      ...filters,
      filterLevel: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const handleChangeJobBenefits = (event) => {
    const {
      target: { value },
    } = event;
    setFilters({
      ...filters,
      filterBenefits: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const handleChangeSalary = (event, newValue) => {
    setFilters({
      ...filters,
      filterSalary: newValue,
    });
  };

  const onReset = () => {
    setFilters(defaultValues);
  };

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    alert(JSON.stringify(filters, null, 2));
    onReset();
  };

  const renderFilters = (
    <>
      <Stack spacing={2.5} direction={{ xs: 'column', md: 'row' }} alignItems="center">
        <PromotionItemKeywordFilter
          filterKeyword={filters.filterKeyword}
          onChangeKeyword={handleChangeKeyword}
        />
        <PromotionItemCategoriesFilter
          filterCategories={filters.filterCategories}
          onChangeCategory={handleChangeCategory}
        />
        <PromotionItemLocationsFilter
          filterLocation={filters.filterLocation}
          onChangeLocation={handleChangeLocation}
        />
        <Button
          size="large"
          variant="contained"
          onClick={onSubmit}
          sx={{
            px: 0,
            minWidth: { md: 48 },
            display: { xs: 'none', md: 'inline-flex' },
          }}
        >
          <Iconify icon={searchIcon} sx={{ width: 24, height: 24 }} />
        </Button>
      </Stack>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 2.5, md: 1 }} sx={{ mt: 2.5 }}>
        <PromotionItemTypeFilter
          filterType={filters.filterType}
          onChangeJobType={handleChangeJobType}
        />
        <PromotionItemLevelFilter
          filterLevel={filters.filterLevel}
          onChangeJobType={handleChangeJobLevel}
        />
        <PromotionItemSalaryFilter
          filterSalary={filters.filterSalary}
          onChangeSalary={handleChangeSalary}
        />
        <PromotionItemBenefitsFilter
          filterBenefits={filters.filterBenefits}
          onChangeJobBenefits={handleChangeJobBenefits}
        />
      </Stack>

      <Button
        size="large"
        variant="contained"
        startIcon={<Iconify icon={searchIcon} sx={{ width: 20, height: 20 }} />}
        sx={{
          mt: 2.5,
          display: { md: 'none' },
        }}
      >
        Search
      </Button>
    </>
  );

  return (
    <>
      {/* -- Desktop -- */}
      <Box
        sx={{
          pt: 5,
          pb: 8,
          display: {
            xs: 'none',
            md: 'block',
          },
        }}
      >
        {renderFilters}
      </Box>

      {/* -- Mobile -- */}
      <Stack
        alignItems="flex-end"
        sx={{
          py: 2.5,
          display: { md: 'none' },
        }}
      >
        <Button
          color="inherit"
          variant="contained"
          startIcon={<Iconify icon={filterIcon} sx={{ width: 18, height: 18 }} />}
          onClick={handleMobileOpen}
        >
          Filters
        </Button>
      </Stack>
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleMobileClose}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            pt: 5,
            px: 3,
            width: DRAWER_WIDTH,
          },
        }}
      >
        {renderFilters}
      </Drawer>
    </>
  );
}
