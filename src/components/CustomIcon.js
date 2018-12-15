import React from 'react';
import { createIconSetFromFontello } from '@expo/vector-icons';

import fontelloConfig from '../../assets/fonts/Icons/config.json';

const Icon = createIconSetFromFontello(fontelloConfig, 'Fontello');

export default Icon;
