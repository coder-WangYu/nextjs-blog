import { Footer, Text } from 'antd';

export default function FooterLayout() {
  return (
    <Footer style={{ 
      textAlign: 'center',
      backgroundColor: '#1f2937',
      color: '#e5e7eb',
      padding: '1rem 0'
    }}>
      <Text style={{ color: '#e5e7eb' }}>
        © {new Date().getFullYear()} 我的个人博客 - 保留所有权利
      </Text>
    </Footer>
  )
}