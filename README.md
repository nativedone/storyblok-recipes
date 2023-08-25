# Storyblok Recipes
A collection of utilities and helpers to enhance your experience with the Storyblok headless CMS.

## Recipe: Find Relations
The findRelations function is a smart utility designed to navigate through a Storyblok content object. It identifies and lists out all relations that may need resolution.

### How does it work?
This function recursively examines an object for properties that match the pattern of Storyblok relations. These are typically properties that hold UUIDs (or arrays of UUIDs) which don't have typical ID-related suffixes.

### Usage

```
async function fetchData(slug: string) {
  const storyblokApi = getStoryblokApi();

  try {
    let response = await storyblokApi.get(`cdn/stories/${slug}`);

    const relationsToResolve = findRelations(response.data.story);

    if (relationsToResolve.length > 0) {
      response = await storyblokApi.get(`cdn/stories/${slug}`, {
        resolve_relations: relationsToResolve,
      });
    }

    if (!response.data) {
      throw new Error(`No data found for slug: ${slug}`);
    }

    return response.data;
  } catch (error) {
    console.error(`Error fetching data for ${slug}:`, error);
    return null;
  }
}

```

This example showcases how to fetch content from Storyblok for a given slug. It then utilizes the findRelations function to detect any relations. If relations are found, another API call is made to resolve them.

# Contribution
Feel free to contribute to these recipes by opening pull requests or creating issues for suggestions or bugs. Let's make our Storyblok experience better together!