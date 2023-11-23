import React, { useEffect, useState } from 'react'
import '../../App.css'
import { IconButton } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import { TextField } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FileToBase64 } from '../../utils/FileToBase64';
import { singleFile } from '../../utils/files'
import { useSelector, useDispatch } from 'react-redux';
import { getProducts, getCategories, getSubCategories, getBrands, deleteProduct, addProduct, editProduct } from '../../reducers/market';
import { useDeleteProductsMutation, useEditProductMutation, useGetProductQuery } from '../../api/getProducts';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Products = () => {

  const products = useSelector((store) => store.market.products)
  const categories = useSelector((store) => store.market.categories)
  const subCategories = useSelector((store) => store.market.subCategories)
  const brands = useSelector((store) => store.market.brands)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts())
    dispatch(getCategories())
    dispatch(getSubCategories())
    dispatch(getBrands())
  }, [dispatch])
  

  const [open, setOpen] = React.useState(false);

  const openPostModal = () => {
    setOpen(true);
  };

  const closePostModal = () => {
    setOpen(false);
  };
  const closePostModal1 = () => {
    setModal(false);
  };

  const {data = []} = useGetProductQuery()

  const [del] = useDeleteProductsMutation()

  const [edit]  = useEditProductMutation()

  const [showImg, setShowImg] = useState(null)

  const handleShowImage = async (event) => {
    let file = await FileToBase64(event.target.files[0]);
    setShowImg(file);
  };

  const [title,setTitle] = useState("")
  const [idx,setIdx] = useState(null)
  const [modal,setModal] = useState(false)

  const [addProductInp, setAddProductInp] = useState("")
  const [addProductPrice, setAddProductPrice] = useState("")
  const [addProductCategory, setAddProductCategory] = useState("")
  const [addProductSubCategory, setAddProductSubCategory] = useState("")
  const [addProductBrand, setAddProductBrand] = useState("")
  const [addProductImg, setAddProductImg] = useState(null)

  const [editProductInp,setEditProductInp] = useState("")
  const [editProductPrice,setEditProductPrice] = useState("")
  const [editProductCategory,setEditProductCategory] = useState("")
  const [editProductSubCategory,setEditProductSubCategory] = useState("")
  const [editProductBrand,setEditProductBrand] = useState("")
  const [editProductImg,setEditProductImg] = useState(null)


  return (
    <>
    <div className='flex justify-end'>
      <IconButton onClick={openPostModal}><AddBoxIcon color="primary" sx={{width: "40px", height: "40px"}}/></IconButton>
    </div>

    <div className='flex flex-wrap justify-center gap-[75px]'>
    {
        products?.map((e, i) => {
            return (
                <div key={e.id}>
                  <div className='w-[360px] h-[298px] rounded-[16px] p-[16px] flex flex-col gap-[16px] bg-[#FAFAFA]'>
                    <div className='flex gap-[16px]'>
                      <img src={"http://localhost:3000/" + products[i]?.img} alt="" className='w-[84px] h-[84px] rounded-[8px]'/>
                      <div className='flex gap-[16px]'>
                        <div className='flex flex-col gap-[16px]'>
                          <div className='w-[180px] h-[43px] flex flex-col'>
                            <span className='text-[#232321] text-[16px] font-semibold'>{e.title}</span>
                            <span className='text-[#646464] text-[14px] font-semibold'>{e.subCategories}</span>
                          </div>
                          <span className='text-[#232321] text-[14px] font-semibold'>${e.price}</span>
                        </div>
                        <div className='w-[32px] h-[27.2px] px-[8px] py-[12px] rounded-[4px] bg-[#EFEFEF] cursor-pointer'>
                          <svg width="16" height="4" viewBox="0 0 16 4" fill="none"><path opacity="0.5" d="M1.6 3.2C1.28355 3.2 0.974206 3.10616 0.711087 2.93035C0.447969 2.75454 0.242893 2.50466 0.121794 2.21229C0.000693321 1.91993 -0.0309925 1.59823 0.0307446 1.28786C0.0924807 0.977487 0.244866 0.692394 0.468631 0.46863C0.692394 0.244866 0.977487 0.0924806 1.28786 0.0307443C1.59823 -0.0309921 1.91993 0.00069325 2.21229 0.121793C2.50466 0.242894 2.75454 0.44797 2.93035 0.711089C3.10616 0.974207 3.2 1.28355 3.2 1.6C3.2 2.02435 3.03143 2.43131 2.73137 2.73137C2.43131 3.03143 2.02435 3.2 1.6 3.2ZM12.8 1.6C12.8 1.91645 12.8938 2.2258 13.0696 2.48891C13.2455 2.75203 13.4953 2.95711 13.7877 3.07821C14.0801 3.19931 14.4018 3.23099 14.7121 3.16926C15.0225 3.10752 15.3076 2.95514 15.5314 2.73137C15.7551 2.50761 15.9075 2.22251 15.9693 1.91215C16.031 1.60178 15.9993 1.28007 15.8782 0.987708C15.7571 0.695346 15.552 0.44546 15.2889 0.26965C15.0258 0.0938393 14.7164 8.63947e-07 14.4 8.63947e-07C13.9757 8.63947e-07 13.5687 0.168572 13.2686 0.46863C12.9686 0.768688 12.8 1.17565 12.8 1.6ZM9.6 1.6C9.6 1.28355 9.50616 0.974207 9.33035 0.711089C9.15454 0.44797 8.90466 0.242894 8.61229 0.121793C8.31993 0.00069325 7.99823 -0.0309921 7.68786 0.0307443C7.37749 0.0924806 7.09239 0.244866 6.86863 0.46863C6.64487 0.692394 6.49248 0.977487 6.43074 1.28786C6.36901 1.59823 6.40069 1.91993 6.52179 2.21229C6.64289 2.50466 6.84797 2.75454 7.11109 2.93035C7.37421 3.10616 7.68355 3.2 8 3.2C8.42435 3.2 8.83131 3.03143 9.13137 2.73137C9.43143 2.43131 9.6 2.02435 9.6 1.6Z" fill="#232321"/></svg>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-[12px]">
                      <IconButton onClick={()=>{
                        setModal(true) 
                        setIdx(e.id)
                        setEditProductInp(e.title)
                        setEditProductCategory(e.categories)
                        setEditProductSubCategory(e.subCategories)
                        setEditProductBrand(e.brands)
                        setEditProductPrice(e.price)
                        setEditProductImg("http://localhost:3000/" + e?.img)
                      }}><EditIcon color="action"/></IconButton>
                      <IconButton onClick={() => dispatch(deleteProduct(e.id))}><DeleteIcon color="error"/></IconButton>
                    </div>
                  </div>
                </div>
            )
        })
    }
    <Dialog
        fullScreen
        open={modal}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={closePostModal1}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Add Product
            </Typography>
            <Button onClick={ async () => {
              if (!addProductImg){
                const newObj = {
                id: idx,
                title: editProductInp,
                categories:editProductCategory,
                subCategories:editProductSubCategory,
                brands:editProductBrand,
                price:editProductPrice,
                img:editProductImg
              }
      dispatch(editProduct({
        ...newObj
      }))
      setModal(false)
              }
              else {
              const formData = new FormData()
              formData.append("file", addProductImg)
              const image = await singleFile(formData)
              dispatch(editProduct({
                id: idx,
                title: editProductInp,
                categories:editProductCategory,
                subCategories:editProductSubCategory,
                brands:editProductBrand,
                price:editProductPrice,
                img: image.img
              }))
              setModal(false)
            }
    } } autoFocus color="inherit">
              save
            </Button>
          </Toolbar>
        </AppBar>
        <div className='flex items-center gap-[15px] px-[17px] py-[20px]'>
          <TextField placeholder="Product" id="outlined-basic" label="Product" value={editProductInp} onChange={(event)=>setEditProductInp(event.target.value)} variant="outlined" />
          <FormControl sx={{ width: '222.667px' }}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
              value={editProductCategory}
              onChange={(e)=>setEditProductCategory(e.target.value)}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Category"
              >
                <MenuItem value={"Смартфоны и планшеты"}>Смартфоны и планшеты</MenuItem>
                <MenuItem value={"Бытовая тахника"}>Бытовая тахника</MenuItem>
                <MenuItem value={"Быковая тахника"}>Быковая тахника</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ width: '222.667px' }}>
              <InputLabel id="demo-simple-select-label">Sub Category</InputLabel>
              <Select
              value={editProductSubCategory}
              onChange={(e)=>setEditProductSubCategory(e.target.value)}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Sub Category"
              >
                <MenuItem value={"Smartphones"}>Smartphones</MenuItem>
                <MenuItem value={"Feauture Phones"}>Feauture Phones</MenuItem>
                <MenuItem value={"Home self"}>Home self</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ width: '222.667px' }}>
              <InputLabel id="demo-simple-select-label">Brand</InputLabel>
              <Select
              value={editProductBrand}
              onChange={(e)=>setEditProductBrand(e.target.value)}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Brand"
              >
                <MenuItem value={"Iphone"}>Apple</MenuItem>
                <MenuItem value={"Huawei"}>Huawei</MenuItem>
                <MenuItem value={"Nokia"}>Nokia</MenuItem>
                <MenuItem value={"Samsung"}>Samsung</MenuItem>
                <MenuItem value={"Redmi"}>Redmi</MenuItem>
                <MenuItem value={"Xiaomi"}>Xiaomi</MenuItem>
              </Select>
            </FormControl>
          <TextField placeholder="Price" id="outlined-basic" label="Price" value={editProductPrice} onChange={(e)=>setEditProductPrice(e.target.value)} variant="outlined" />
          <form method="post" enctype="multipart/form-data">
            <label class="input-file">
              <input type="file" name="file" onChange={(event) => { setAddProductImg(event.target.files[0]), handleShowImage(event)}} />
              <span className='text-white font-medium'>Select from computer</span>
            </label>
          </form>
        </div>
        <img src={showImg} alt="" />
      </Dialog>
    </div>

    <Dialog
        fullScreen
        open={open}
        onClose={closePostModal}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={closePostModal}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Add Product
            </Typography>
            <Button onClick={ async () => {
                          let formData = new FormData()
                          formData.append("file", addProductImg)
                          const image = await singleFile(formData)
      dispatch(addProduct({
        "title":addProductInp,
        "price":addProductPrice,
        "categories":addProductCategory,
        "subCategories":addProductSubCategory,
        "brands":addProductBrand,
        "img":image.img
      }))
      setAddProductInp("")
      setOpen(false)
    } } autoFocus color="inherit">
              save
            </Button>
          </Toolbar>
        </AppBar>
        <div className='flex items-center gap-[15px] px-[17px] py-[20px]'>
          <TextField placeholder="Product" id="outlined-basic" label="Product" value={addProductInp} onChange={(event)=>setAddProductInp(event.target.value)} variant="outlined" />
          <FormControl sx={{ width: '222.667px' }}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
              value={addProductCategory}
              onChange={(e)=>setAddProductCategory(e.target.value)}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Category"
              >
                <MenuItem value={"Смартфоны и планшеты"}>Смартфоны и планшеты</MenuItem>
                <MenuItem value={"Бытовая тахника"}>Бытовая тахника</MenuItem>
                <MenuItem value={"Быковая тахника"}>Быковая тахника</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ width: '222.667px' }}>
              <InputLabel id="demo-simple-select-label">Sub Category</InputLabel>
              <Select
              value={addProductSubCategory}
              onChange={(e)=>setAddProductSubCategory(e.target.value)}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Sub Category"
              >
                <MenuItem value={"Smartphones"}>Smartphones</MenuItem>
                <MenuItem value={"Feauture Phones"}>Feauture Phones</MenuItem>
                <MenuItem value={"Home self"}>Home self</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ width: '222.667px' }}>
              <InputLabel id="demo-simple-select-label">Brand</InputLabel>
              <Select
              value={addProductBrand}
              onChange={(e)=>setAddProductBrand(e.target.value)}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Brand"
              >
                <MenuItem value={"Iphone"}>Apple</MenuItem>
                <MenuItem value={"Huawei"}>Huawei</MenuItem>
                <MenuItem value={"Nokia"}>Nokia</MenuItem>
                <MenuItem value={"Samsung"}>Samsung</MenuItem>
                <MenuItem value={"Redmi"}>Redmi</MenuItem>
                <MenuItem value={"Xiaomi"}>Xiaomi</MenuItem>
              </Select>
            </FormControl>
          <TextField placeholder="Price" id="outlined-basic" label="Price" value={addProductPrice} onChange={(e)=>setAddProductPrice(e.target.value)} variant="outlined" />
          <form method="post" enctype="multipart/form-data">
            <label class="input-file">
              <input type="file" name="file" onChange={(event) => { setAddProductImg(event.target.files[0]), handleShowImage(event)}} />
              <span className='text-white font-medium'>Select from computer</span>
            </label>
          </form>
        </div>
        <img src={showImg} alt="" placeholder='s' />
      </Dialog>
    </>
  )
}

export default Products