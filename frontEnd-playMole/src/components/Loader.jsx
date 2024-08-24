import ContentLoader from 'react-content-loader'

export const CheckboxList = props => (
  <ContentLoader
    speed={2}
    backgroundColor="#f1e3e3"
    foregroundColor="#878877"
    {...props}
  >
    <rect rx="5" width="300" height="20" />
    <rect rx="5" width="300" height="20" y="30" />
    <rect rx="5" width="300" height="20" y="30" />
    <rect rx="5" width="300" height="20" y="60" />
    <rect rx="5" width="300" height="20" y="90" />
    <rect rx="5" width="300" height="20" y="120" />
  
  </ContentLoader>
  
)

CheckboxList.metadata = {
  name: 'Manuela Garcia',
  github: 'ManuelaGar',
  description: 'This is a checkbox list loader.',
  filename: 'CheckboxList',
}
