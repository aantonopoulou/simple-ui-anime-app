import { View, Text, Button} from 'react-native';

async function fetchComments(postId:number) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`,
  );
  return response.json();
}

async function deletePost(postId:number) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    {method: 'DELETE'},
  );
  return response.json();
}

async function updatePost(postId:number) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    {method: 'PATCH', data: {title: 'REACT QUERY FOREVER!!!!'}},
  );
  return response.json();
}

export function PostDetail({post}) {
  // replace with useQuery
  const data = useQuery('posts', fetchPosts);
  if (!data) return <View></View>;

  return (
    <>
      <View style={{color: 'blue'}}>{post.title}</View>
      <button>Delete</button> <button>Update title</button>
      {post.body}
      <Text>Comments</Text>
      {data.map(comment => (
        key={comment.id}
        {comment.email}: {comment.body}
      ))}
    </>
  );
}
