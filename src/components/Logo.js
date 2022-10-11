import PropTypes from 'prop-types'
import { memo } from 'react'
// next
import NextLink from 'next/link'
// @mui
import { useTheme } from '@mui/material/styles'
import { Box } from '@mui/material'

// ----------------------------------------------------------------------

Logo.propTypes = {
  isSimple: PropTypes.bool,
  onDark: PropTypes.bool,
  sx: PropTypes.object,
}

function Logo({ onDark = false, isSimple = false, sx }) {
  const theme = useTheme()
  const isLight = theme.palette.mode === 'light'

  const PRIMARY_MAIN = theme.palette.primary.main
  const LIGHT_COLOR = theme.palette.common.white
  const DARK_COLOR = theme.palette.grey[800]

  return (
    <NextLink href="/" passHref>
      <Box
        sx={{
          width: isSimple ? 64 : 75,
          lineHeight: 0,
          cursor: 'pointer',
          display: 'inline-flex',
          ...sx,
        }}
      >
        {isSimple ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="none"
            viewBox="0 0 573 213"
          >
            {/* <ellipse cx="405.143" cy="338.571" fill={PRIMARY_MAIN} rx="82.857" ry="82.857" /> */}
            <path
              fill="#FFFFFF"
              opacity="1.000000"
              stroke="none"
              d="
M561.000000,214.000000 
	C374.439301,214.000000 187.878616,214.000000 1.000000,214.000000 
	C1.000000,143.979431 1.000000,73.958374 1.343728,3.612875 
	C8.621453,22.191898 15.513158,41.111012 22.499359,59.995163 
	C32.979969,88.324928 43.538883,116.625717 54.041683,144.947296 
	C62.058655,166.565674 70.032158,188.200165 78.093300,209.802002 
	C78.261337,210.252304 79.261406,210.392105 80.337265,210.798645 
	C97.293587,210.946808 113.786469,210.914886 130.277878,211.054977 
	C133.125656,211.079163 134.238312,209.970474 135.100662,207.364288 
	C137.369980,200.505981 139.995178,193.764679 142.511948,186.989151 
	C155.036530,153.271103 167.553787,119.550285 180.110214,85.844086 
	C187.564392,65.834229 195.119446,45.861927 202.560837,25.847347 
	C205.385315,18.250502 208.018219,10.582429 210.944000,2.369880 
	C192.560669,2.369880 174.998764,2.369880 157.344452,2.369880 
	C154.024796,11.308884 150.764984,20.260113 147.382065,29.164570 
	C135.948486,59.259750 124.497353,89.348328 112.990173,119.415405 
	C110.489204,125.950157 107.727554,132.385132 104.912926,138.543396 
	C100.480408,126.854050 96.209000,115.491798 91.964241,104.119606 
	C85.500450,86.802406 79.002846,69.497551 72.616798,52.151669 
	C66.348038,35.124363 60.200649,18.052378 54.000000,1.000000 
	C111.687561,1.000000 169.375122,1.000000 227.530243,1.394554 
	C227.891449,2.430830 227.885269,3.109535 227.664047,3.708865 
	C221.980667,19.105911 216.288940,34.499920 210.569778,49.883713 
	C200.887299,75.928314 191.190414,101.967567 181.489075,128.005142 
	C175.134811,145.059418 168.719940,162.091217 162.413162,179.162994 
	C158.553604,189.610474 154.847229,200.114532 150.926483,210.997223 
	C168.091522,210.997223 184.730072,211.051132 201.366364,210.883316 
	C202.552383,210.871353 204.372787,209.475555 204.804199,208.316147 
	C215.967560,178.315140 226.939636,148.243057 238.048080,118.221497 
	C243.624741,103.150108 249.403809,88.153610 255.408112,73.275909 
	C257.673004,78.654854 259.589752,83.893089 261.574463,89.105453 
	C272.264404,117.180237 282.978638,145.245773 293.668762,173.320480 
	C298.321533,185.539749 302.936737,197.773300 307.439667,209.658997 
	C325.544678,209.658997 343.093231,209.658997 360.971100,209.658997 
	C360.109863,206.928253 359.477509,204.562851 358.626404,202.278976 
	C347.104797,171.361374 335.539642,140.460007 324.013062,109.544235 
	C316.501007,89.395935 308.999634,69.243523 301.558014,49.069149 
	C295.654572,33.064827 289.849030,17.024393 284.000000,0.999995 
	C380.573242,1.000000 477.146484,1.000000 574.000000,1.000000 
	C574.000000,55.020573 574.000000,109.041626 573.531372,163.531342 
	C554.475342,163.666885 535.888977,163.258102 517.300415,163.017685 
	C486.229584,162.615829 455.157349,162.321548 424.049622,161.515778 
	C424.013519,108.818703 424.013519,56.587833 424.013519,4.336397 
	C405.029602,4.336397 386.650970,4.336397 368.269958,4.336397 
	C368.152924,5.146564 368.022339,5.627867 368.022461,6.109135 
	C368.039490,73.391235 368.066040,140.673325 368.039551,208.385529 
	C369.155426,209.543472 370.308136,210.877548 371.494598,210.908310 
	C389.412323,211.372910 407.333160,211.802963 425.255798,211.972900 
	C469.142944,212.389069 513.031433,212.657898 556.918945,213.040665 
	C558.281982,213.052551 559.639771,213.666656 561.000000,214.000000 
z"
            />
            <path
              fill="#61BBE4"
              opacity="1.000000"
              stroke="none"
              d="
M283.531372,0.999995 
	C289.849030,17.024393 295.654572,33.064827 301.558014,49.069149 
	C308.999634,69.243523 316.501007,89.395935 324.013062,109.544235 
	C335.539642,140.460007 347.104797,171.361374 358.626404,202.278976 
	C359.477509,204.562851 360.109863,206.928253 360.971100,209.658997 
	C343.093231,209.658997 325.544678,209.658997 307.439667,209.658997 
	C302.936737,197.773300 298.321533,185.539749 293.668762,173.320480 
	C282.978638,145.245773 272.264404,117.180237 261.574463,89.105453 
	C259.589752,83.893089 257.673004,78.654854 255.380081,72.853989 
	C254.384521,69.576797 253.977676,66.786194 253.039993,64.187096 
	C249.358795,53.983562 245.573212,43.816399 241.706894,33.681305 
	C237.541000,22.760931 233.241318,11.891600 229.000000,1.000000 
	C247.020889,1.000000 265.041779,1.000000 283.531372,0.999995 
z"
            />
            <path
              fill="#169BD7"
              opacity="1.000000"
              stroke="none"
              d="
M79.873322,210.676773 
	C79.261406,210.392105 78.261337,210.252304 78.093300,209.802002 
	C70.032158,188.200165 62.058655,166.565674 54.041683,144.947296 
	C43.538883,116.625717 32.979969,88.324928 22.499359,59.995163 
	C15.513158,41.111012 8.621453,22.191898 1.343728,3.144217 
	C0.390256,-0.029198 2.689569,1.035878 3.959975,1.032109 
	C20.327431,0.983554 36.695084,1.000000 53.531342,1.000000 
	C60.200649,18.052378 66.348038,35.124363 72.616798,52.151669 
	C79.002846,69.497551 85.500450,86.802406 91.964241,104.119606 
	C96.209000,115.491798 100.480408,126.854050 104.887253,138.978485 
	C103.195946,145.887207 101.559654,152.107910 99.470284,158.172516 
	C96.473885,166.869888 93.178200,175.465103 89.952423,184.082260 
	C86.628860,192.960632 83.235909,201.813019 79.873322,210.676773 
z"
            />
            <path
              fill="#169BD7"
              opacity="1.000000"
              stroke="none"
              d="
M228.750000,1.000000 
	C233.241318,11.891600 237.541000,22.760931 241.706894,33.681305 
	C245.573212,43.816399 249.358795,53.983562 253.039993,64.187096 
	C253.977676,66.786194 254.384521,69.576797 255.063293,72.701340 
	C249.403809,88.153610 243.624741,103.150108 238.048080,118.221497 
	C226.939636,148.243057 215.967560,178.315140 204.804199,208.316147 
	C204.372787,209.475555 202.552383,210.871353 201.366364,210.883316 
	C184.730072,211.051132 168.091522,210.997223 150.926483,210.997223 
	C154.847229,200.114532 158.553604,189.610474 162.413162,179.162994 
	C168.719940,162.091217 175.134811,145.059418 181.489075,128.005142 
	C191.190414,101.967567 200.887299,75.928314 210.569778,49.883713 
	C216.288940,34.499920 221.980667,19.105911 227.664047,3.708865 
	C227.885269,3.109535 227.891449,2.430830 227.998901,1.394554 
	C228.000000,1.000000 228.500000,1.000000 228.750000,1.000000 
z"
            />
            <path
              fill="#61BBE4"
              opacity="1.000000"
              stroke="none"
              d="
M561.476685,214.000000 
	C559.639771,213.666656 558.281982,213.052551 556.918945,213.040665 
	C513.031433,212.657898 469.142944,212.389069 425.255798,211.972900 
	C407.333160,211.802963 389.412323,211.372910 371.494598,210.908310 
	C370.308136,210.877548 369.155426,209.543472 368.382751,208.381104 
	C373.649872,203.998108 378.569519,200.107422 383.383484,196.090088 
	C396.974091,184.748535 410.521332,173.355011 424.085693,161.981979 
	C455.157349,162.321548 486.229584,162.615829 517.300415,163.017685 
	C535.888977,163.258102 554.475342,163.666885 573.531372,164.000000 
	C574.000000,180.545792 574.000000,197.091568 574.000000,214.000000 
	C569.991699,214.000000 565.972534,214.000000 561.476685,214.000000 
z"
            />
            <path
              fill="#61BBE4"
              opacity="1.000000"
              stroke="none"
              d="
M80.337265,210.798645 
	C83.235909,201.813019 86.628860,192.960632 89.952423,184.082260 
	C93.178200,175.465103 96.473885,166.869888 99.470284,158.172516 
	C101.559654,152.107910 103.195946,145.887207 105.060295,139.301147 
	C107.727554,132.385132 110.489204,125.950157 112.990173,119.415405 
	C124.497353,89.348328 135.948486,59.259750 147.382065,29.164570 
	C150.764984,20.260113 154.024796,11.308884 157.344452,2.369880 
	C174.998764,2.369880 192.560669,2.369880 210.944000,2.369880 
	C208.018219,10.582429 205.385315,18.250502 202.560837,25.847347 
	C195.119446,45.861927 187.564392,65.834229 180.110214,85.844086 
	C167.553787,119.550285 155.036530,153.271103 142.511948,186.989151 
	C139.995178,193.764679 137.369980,200.505981 135.100662,207.364288 
	C134.238312,209.970474 133.125656,211.079163 130.277878,211.054977 
	C113.786469,210.914886 97.293587,210.946808 80.337265,210.798645 
z"
            />
            <path
              fill="#169BD7"
              opacity="1.000000"
              stroke="none"
              d="
M424.049622,161.515778 
	C410.521332,173.355011 396.974091,184.748535 383.383484,196.090088 
	C378.569519,200.107422 373.649872,203.998108 368.435303,207.951019 
	C368.066040,140.673325 368.039490,73.391235 368.022461,6.109135 
	C368.022339,5.627867 368.152924,5.146564 368.269958,4.336397 
	C386.650970,4.336397 405.029602,4.336397 424.013519,4.336397 
	C424.013519,56.587833 424.013519,108.818703 424.049622,161.515778 
z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg "
            width="100%"
            height="100%"
            fill="none"
            viewBox="0 0 573 213"
          >
            {/* <ellipse cx="996" cy="204" fill={PRIMARY_MAIN} rx="60" ry="60" /> */}
            <path
              fill="#FFFFFF"
              opacity="1.000000"
              stroke="none"
              d="
M561.000000,214.000000 
	C374.439301,214.000000 187.878616,214.000000 1.000000,214.000000 
	C1.000000,143.979431 1.000000,73.958374 1.343728,3.612875 
	C8.621453,22.191898 15.513158,41.111012 22.499359,59.995163 
	C32.979969,88.324928 43.538883,116.625717 54.041683,144.947296 
	C62.058655,166.565674 70.032158,188.200165 78.093300,209.802002 
	C78.261337,210.252304 79.261406,210.392105 80.337265,210.798645 
	C97.293587,210.946808 113.786469,210.914886 130.277878,211.054977 
	C133.125656,211.079163 134.238312,209.970474 135.100662,207.364288 
	C137.369980,200.505981 139.995178,193.764679 142.511948,186.989151 
	C155.036530,153.271103 167.553787,119.550285 180.110214,85.844086 
	C187.564392,65.834229 195.119446,45.861927 202.560837,25.847347 
	C205.385315,18.250502 208.018219,10.582429 210.944000,2.369880 
	C192.560669,2.369880 174.998764,2.369880 157.344452,2.369880 
	C154.024796,11.308884 150.764984,20.260113 147.382065,29.164570 
	C135.948486,59.259750 124.497353,89.348328 112.990173,119.415405 
	C110.489204,125.950157 107.727554,132.385132 104.912926,138.543396 
	C100.480408,126.854050 96.209000,115.491798 91.964241,104.119606 
	C85.500450,86.802406 79.002846,69.497551 72.616798,52.151669 
	C66.348038,35.124363 60.200649,18.052378 54.000000,1.000000 
	C111.687561,1.000000 169.375122,1.000000 227.530243,1.394554 
	C227.891449,2.430830 227.885269,3.109535 227.664047,3.708865 
	C221.980667,19.105911 216.288940,34.499920 210.569778,49.883713 
	C200.887299,75.928314 191.190414,101.967567 181.489075,128.005142 
	C175.134811,145.059418 168.719940,162.091217 162.413162,179.162994 
	C158.553604,189.610474 154.847229,200.114532 150.926483,210.997223 
	C168.091522,210.997223 184.730072,211.051132 201.366364,210.883316 
	C202.552383,210.871353 204.372787,209.475555 204.804199,208.316147 
	C215.967560,178.315140 226.939636,148.243057 238.048080,118.221497 
	C243.624741,103.150108 249.403809,88.153610 255.408112,73.275909 
	C257.673004,78.654854 259.589752,83.893089 261.574463,89.105453 
	C272.264404,117.180237 282.978638,145.245773 293.668762,173.320480 
	C298.321533,185.539749 302.936737,197.773300 307.439667,209.658997 
	C325.544678,209.658997 343.093231,209.658997 360.971100,209.658997 
	C360.109863,206.928253 359.477509,204.562851 358.626404,202.278976 
	C347.104797,171.361374 335.539642,140.460007 324.013062,109.544235 
	C316.501007,89.395935 308.999634,69.243523 301.558014,49.069149 
	C295.654572,33.064827 289.849030,17.024393 284.000000,0.999995 
	C380.573242,1.000000 477.146484,1.000000 574.000000,1.000000 
	C574.000000,55.020573 574.000000,109.041626 573.531372,163.531342 
	C554.475342,163.666885 535.888977,163.258102 517.300415,163.017685 
	C486.229584,162.615829 455.157349,162.321548 424.049622,161.515778 
	C424.013519,108.818703 424.013519,56.587833 424.013519,4.336397 
	C405.029602,4.336397 386.650970,4.336397 368.269958,4.336397 
	C368.152924,5.146564 368.022339,5.627867 368.022461,6.109135 
	C368.039490,73.391235 368.066040,140.673325 368.039551,208.385529 
	C369.155426,209.543472 370.308136,210.877548 371.494598,210.908310 
	C389.412323,211.372910 407.333160,211.802963 425.255798,211.972900 
	C469.142944,212.389069 513.031433,212.657898 556.918945,213.040665 
	C558.281982,213.052551 559.639771,213.666656 561.000000,214.000000 
z"
            />
            <path
              fill="#61BBE4"
              opacity="1.000000"
              stroke="none"
              d="
M283.531372,0.999995 
	C289.849030,17.024393 295.654572,33.064827 301.558014,49.069149 
	C308.999634,69.243523 316.501007,89.395935 324.013062,109.544235 
	C335.539642,140.460007 347.104797,171.361374 358.626404,202.278976 
	C359.477509,204.562851 360.109863,206.928253 360.971100,209.658997 
	C343.093231,209.658997 325.544678,209.658997 307.439667,209.658997 
	C302.936737,197.773300 298.321533,185.539749 293.668762,173.320480 
	C282.978638,145.245773 272.264404,117.180237 261.574463,89.105453 
	C259.589752,83.893089 257.673004,78.654854 255.380081,72.853989 
	C254.384521,69.576797 253.977676,66.786194 253.039993,64.187096 
	C249.358795,53.983562 245.573212,43.816399 241.706894,33.681305 
	C237.541000,22.760931 233.241318,11.891600 229.000000,1.000000 
	C247.020889,1.000000 265.041779,1.000000 283.531372,0.999995 
z"
            />
            <path
              fill="#169BD7"
              opacity="1.000000"
              stroke="none"
              d="
M79.873322,210.676773 
	C79.261406,210.392105 78.261337,210.252304 78.093300,209.802002 
	C70.032158,188.200165 62.058655,166.565674 54.041683,144.947296 
	C43.538883,116.625717 32.979969,88.324928 22.499359,59.995163 
	C15.513158,41.111012 8.621453,22.191898 1.343728,3.144217 
	C0.390256,-0.029198 2.689569,1.035878 3.959975,1.032109 
	C20.327431,0.983554 36.695084,1.000000 53.531342,1.000000 
	C60.200649,18.052378 66.348038,35.124363 72.616798,52.151669 
	C79.002846,69.497551 85.500450,86.802406 91.964241,104.119606 
	C96.209000,115.491798 100.480408,126.854050 104.887253,138.978485 
	C103.195946,145.887207 101.559654,152.107910 99.470284,158.172516 
	C96.473885,166.869888 93.178200,175.465103 89.952423,184.082260 
	C86.628860,192.960632 83.235909,201.813019 79.873322,210.676773 
z"
            />
            <path
              fill="#169BD7"
              opacity="1.000000"
              stroke="none"
              d="
M228.750000,1.000000 
	C233.241318,11.891600 237.541000,22.760931 241.706894,33.681305 
	C245.573212,43.816399 249.358795,53.983562 253.039993,64.187096 
	C253.977676,66.786194 254.384521,69.576797 255.063293,72.701340 
	C249.403809,88.153610 243.624741,103.150108 238.048080,118.221497 
	C226.939636,148.243057 215.967560,178.315140 204.804199,208.316147 
	C204.372787,209.475555 202.552383,210.871353 201.366364,210.883316 
	C184.730072,211.051132 168.091522,210.997223 150.926483,210.997223 
	C154.847229,200.114532 158.553604,189.610474 162.413162,179.162994 
	C168.719940,162.091217 175.134811,145.059418 181.489075,128.005142 
	C191.190414,101.967567 200.887299,75.928314 210.569778,49.883713 
	C216.288940,34.499920 221.980667,19.105911 227.664047,3.708865 
	C227.885269,3.109535 227.891449,2.430830 227.998901,1.394554 
	C228.000000,1.000000 228.500000,1.000000 228.750000,1.000000 
z"
            />
            <path
              fill="#61BBE4"
              opacity="1.000000"
              stroke="none"
              d="
M561.476685,214.000000 
	C559.639771,213.666656 558.281982,213.052551 556.918945,213.040665 
	C513.031433,212.657898 469.142944,212.389069 425.255798,211.972900 
	C407.333160,211.802963 389.412323,211.372910 371.494598,210.908310 
	C370.308136,210.877548 369.155426,209.543472 368.382751,208.381104 
	C373.649872,203.998108 378.569519,200.107422 383.383484,196.090088 
	C396.974091,184.748535 410.521332,173.355011 424.085693,161.981979 
	C455.157349,162.321548 486.229584,162.615829 517.300415,163.017685 
	C535.888977,163.258102 554.475342,163.666885 573.531372,164.000000 
	C574.000000,180.545792 574.000000,197.091568 574.000000,214.000000 
	C569.991699,214.000000 565.972534,214.000000 561.476685,214.000000 
z"
            />
            <path
              fill="#61BBE4"
              opacity="1.000000"
              stroke="none"
              d="
M80.337265,210.798645 
	C83.235909,201.813019 86.628860,192.960632 89.952423,184.082260 
	C93.178200,175.465103 96.473885,166.869888 99.470284,158.172516 
	C101.559654,152.107910 103.195946,145.887207 105.060295,139.301147 
	C107.727554,132.385132 110.489204,125.950157 112.990173,119.415405 
	C124.497353,89.348328 135.948486,59.259750 147.382065,29.164570 
	C150.764984,20.260113 154.024796,11.308884 157.344452,2.369880 
	C174.998764,2.369880 192.560669,2.369880 210.944000,2.369880 
	C208.018219,10.582429 205.385315,18.250502 202.560837,25.847347 
	C195.119446,45.861927 187.564392,65.834229 180.110214,85.844086 
	C167.553787,119.550285 155.036530,153.271103 142.511948,186.989151 
	C139.995178,193.764679 137.369980,200.505981 135.100662,207.364288 
	C134.238312,209.970474 133.125656,211.079163 130.277878,211.054977 
	C113.786469,210.914886 97.293587,210.946808 80.337265,210.798645 
z"
            />
            <path
              fill="#169BD7"
              opacity="1.000000"
              stroke="none"
              d="
M424.049622,161.515778 
	C410.521332,173.355011 396.974091,184.748535 383.383484,196.090088 
	C378.569519,200.107422 373.649872,203.998108 368.435303,207.951019 
	C368.066040,140.673325 368.039490,73.391235 368.022461,6.109135 
	C368.022339,5.627867 368.152924,5.146564 368.269958,4.336397 
	C386.650970,4.336397 405.029602,4.336397 424.013519,4.336397 
	C424.013519,56.587833 424.013519,108.818703 424.049622,161.515778 
z"
            />
          </svg>
        )}
      </Box>
    </NextLink>
  )
}

export default memo(Logo)
