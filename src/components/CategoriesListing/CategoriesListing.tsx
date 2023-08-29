import { Link, Stack, Typography } from '@mui/material';
import { CategoriesList, CategoryListItem, Language } from 'types/types';
import { Link as RouterLink } from 'react-router-dom';

interface CategoriesListingProps {
  language: Language;
  categories: CategoriesList;
  currentCategoryID?: string;
}

function CategoriesListing({ language, categories, currentCategoryID = '' }: CategoriesListingProps) {
  const findSubCategories = (category: CategoryListItem): CategoryListItem[] => {
    return categories.subs.filter((subCategory) => subCategory.parent?.id === category.id);
  };

  return (
    <Stack>
      <Typography variant="h5">Categories:</Typography>
      {categories.mains.map((category) => (
        <Stack key={category.id}>
          <Link
            variant="h6"
            component={RouterLink}
            to={`/catalog/${category.id}`}
            sx={{ fontWeight: category.id === currentCategoryID ? '700' : '400' }}>
            {category.name[language]}
          </Link>
          {findSubCategories(category).map((subCategory) => (
            <Link
              variant="subtitle1"
              key={subCategory.id}
              component={RouterLink}
              to={`/catalog/${subCategory.id}`}
              pl={1}
              sx={{ fontWeight: subCategory.id === currentCategoryID ? '700' : '400' }}>
              {subCategory.name[language]}
            </Link>
          ))}
        </Stack>
      ))}
    </Stack>
  );
}

export default CategoriesListing;
