import { DEFAULT_LANGUAGE } from 'constants/const';
import { Link } from 'react-router-dom';
import { Box, Breadcrumbs, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import type { CategoriesList, CategoryListItem, Language } from 'types/types';

interface IProps {
  categories: CategoriesList;
  categoryId?: string;
  language?: Language;
}

interface ICurrentCategory {
  id: string;
  name: string;
}
interface ICurrentCategoryHierarchy {
  parent?: ICurrentCategory;
  category?: ICurrentCategory;
}

const getCategoryByID = (categories: CategoryListItem[], id?: string) => {
  return categories.find((elem) => elem.id === id);
};

const getCategoryHierarchy = (
  categories: CategoriesList,
  id?: string,
  language = DEFAULT_LANGUAGE
): ICurrentCategoryHierarchy => {
  const category = getCategoryByID(categories.mains, id);
  if (category) {
    return {
      category: { id: category.id, name: category.name[language] },
    };
  }
  const subCategory = getCategoryByID(categories.subs, id);
  if (subCategory) {
    const parent = getCategoryByID(categories.mains, subCategory.parent?.id);
    if (parent) {
      return {
        parent: { id: parent.id, name: parent.name[language] },
        category: { id: subCategory.id, name: subCategory.name[language] },
      };
    }
    return {
      category: { id: subCategory.id, name: subCategory.name[language] },
    };
  }
  return {};
};

function BreadcrumbNavigation({ categories, categoryId, language }: IProps) {
  const categoryHierarchy = getCategoryHierarchy(categories, categoryId, language);
  return (
    <Box mt={2} mb={3}>
      <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
        <Typography
          component={Link}
          to="/catalog"
          sx={{ color: 'text.primary', '&:hover': { textDecoration: 'underline' } }}>
          All categories
        </Typography>
        {categoryHierarchy.parent && (
          <Typography
            component={Link}
            to={`/catalog/${categoryHierarchy.parent.id}`}
            sx={{ color: 'text.primary', '&:hover': { textDecoration: 'underline' } }}>
            {categoryHierarchy.parent.name}
          </Typography>
        )}
        {categoryHierarchy.category && <Typography color="text.primary">{categoryHierarchy.category.name}</Typography>}
      </Breadcrumbs>
    </Box>
  );
}

export default BreadcrumbNavigation;
